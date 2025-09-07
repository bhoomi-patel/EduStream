"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface WaveformVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>
  isPlaying: boolean
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export function WaveformVisualizer({ audioRef, isPlaying, canvasRef }: WaveformVisualizerProps) {
  const animationRef = useRef<number>()
  const audioContextRef = useRef<AudioContext>()
  const analyserRef = useRef<AnalyserNode>()
  const dataArrayRef = useRef<Uint8Array>()

  useEffect(() => {
    const audio = audioRef.current
    const canvas = canvasRef.current
    if (!audio || !canvas) return

    const setupAudioContext = () => {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)()
        const source = audioContextRef.current.createMediaElementSource(audio)
        analyserRef.current = audioContextRef.current.createAnalyser()

        source.connect(analyserRef.current)
        analyserRef.current.connect(audioContextRef.current.destination)

        analyserRef.current.fftSize = 256
        const bufferLength = analyserRef.current.frequencyBinCount
        dataArrayRef.current = new Uint8Array(bufferLength)
      }
    }

    const draw = () => {
      if (!canvas || !analyserRef.current || !dataArrayRef.current) return

      const ctx = canvas.getContext("2d")
      if (!ctx) return

      analyserRef.current.getByteFrequencyData(dataArrayRef.current)

      ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const barWidth = (canvas.width / dataArrayRef.current.length) * 2.5
      let barHeight
      let x = 0

      for (let i = 0; i < dataArrayRef.current.length; i++) {
        barHeight = (dataArrayRef.current[i] / 255) * canvas.height * 0.8

        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height)
        gradient.addColorStop(0, "hsl(200, 70%, 60%)")
        gradient.addColorStop(1, "hsl(45, 70%, 60%)")

        ctx.fillStyle = gradient
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight)

        x += barWidth + 1
      }

      if (isPlaying) {
        animationRef.current = requestAnimationFrame(draw)
      }
    }

    const handlePlay = () => {
      setupAudioContext()
      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume()
      }
      draw()
    }

    const handlePause = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [audioRef, canvasRef, isPlaying])

  return null
}
