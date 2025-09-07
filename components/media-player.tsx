"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw, Settings } from "lucide-react"
import { WaveformVisualizer } from "@/components/waveform-visualizer"
import { usePreferences } from "@/contexts/preferences-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MediaItem {
  id: number
  title: string
  type: "video" | "audio"
  url: string
  thumbnail: string
  duration: string
}

interface MediaPlayerProps {
  media: MediaItem
  isPlaying: boolean
  onPlayPause: (playing: boolean) => void
}

export function MediaPlayer({ media, isPlaying, onPlayPause }: MediaPlayerProps) {
  const mediaRef = useRef<HTMLVideoElement | HTMLAudioElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)

  const { preferences } = usePreferences()

  useEffect(() => {
    const mediaElement = mediaRef.current
    if (!mediaElement) return

    const handleTimeUpdate = () => setCurrentTime(mediaElement.currentTime)
    const handleDurationChange = () => setDuration(mediaElement.duration)
    const handleVolumeChange = () => {
      setVolume(mediaElement.volume)
      setIsMuted(mediaElement.muted)
    }

    mediaElement.addEventListener("timeupdate", handleTimeUpdate)
    mediaElement.addEventListener("durationchange", handleDurationChange)
    mediaElement.addEventListener("volumechange", handleVolumeChange)

    return () => {
      mediaElement.removeEventListener("timeupdate", handleTimeUpdate)
      mediaElement.removeEventListener("durationchange", handleDurationChange)
      mediaElement.removeEventListener("volumechange", handleVolumeChange)
    }
  }, [media])

  // Apply user preferences
  useEffect(() => {
    const mediaElement = mediaRef.current
    if (!mediaElement) return

    // Apply playback speed preference
    mediaElement.playbackRate = preferences.playbackSpeed
    setPlaybackRate(preferences.playbackSpeed)

    // Apply autoplay preference
    if (preferences.autoplay && isPlaying) {
      mediaElement.play()
    }
  }, [preferences.playbackSpeed, preferences.autoplay, isPlaying])

  useEffect(() => {
    const mediaElement = mediaRef.current
    if (!mediaElement) return

    if (isPlaying) {
      mediaElement.play()
    } else {
      mediaElement.pause()
    }
  }, [isPlaying])

  const handlePlayPause = () => {
    onPlayPause(!isPlaying)
  }

  const handleSeek = (value: number[]) => {
    const mediaElement = mediaRef.current
    if (mediaElement) {
      mediaElement.currentTime = value[0]
      setCurrentTime(value[0])
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const mediaElement = mediaRef.current
    if (mediaElement) {
      mediaElement.volume = value[0]
      setVolume(value[0])
    }
  }

  const handleMute = () => {
    const mediaElement = mediaRef.current
    if (mediaElement) {
      mediaElement.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleFullscreen = () => {
    const mediaElement = mediaRef.current
    if (mediaElement && media.type === "video") {
      if (!isFullscreen) {
        mediaElement.requestFullscreen()
        setIsFullscreen(true)
      } else {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    const mediaElement = mediaRef.current
    if (mediaElement) {
      mediaElement.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const skip = (seconds: number) => {
    const mediaElement = mediaRef.current
    if (mediaElement) {
      mediaElement.currentTime = Math.max(0, Math.min(duration, currentTime + seconds))
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  return (
    <div className="bg-black relative">
      {media.type === "video" ? (
        <video
          ref={mediaRef as React.RefObject<HTMLVideoElement>}
          className="w-full aspect-video"
          poster={media.thumbnail}
          crossOrigin="anonymous"
        >
          <source src={media.url} type="video/mp4" />
          {preferences.subtitles && <track kind="subtitles" src="/subtitles.vtt" srcLang="en" label="English" />}
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
          <audio ref={mediaRef as React.RefObject<HTMLAudioElement>} crossOrigin="anonymous">
            <source src={media.url} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
          <WaveformVisualizer
            audioRef={mediaRef as React.RefObject<HTMLAudioElement>}
            isPlaying={isPlaying}
            canvasRef={canvasRef}
          />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" width={800} height={400} />
        </div>
      )}

      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-4">
          <Slider value={[currentTime]} max={duration || 100} step={1} onValueChange={handleSeek} className="w-full" />
          <div className="flex justify-between text-white text-sm mt-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => skip(-10)} className="text-white hover:bg-white/20">
              <RotateCcw className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" onClick={handlePlayPause} className="text-white hover:bg-white/20">
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>

            <Button variant="ghost" size="icon" onClick={() => skip(10)} className="text-white hover:bg-white/20">
              <RotateCw className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleMute} className="text-white hover:bg-white/20">
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </Button>

            <div className="w-20">
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.1}
                onValueChange={handleVolumeChange}
                className="w-full"
              />
            </div>

            {/* Playback Speed */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(0.5)}>
                  0.5x {playbackRate === 0.5 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(0.75)}>
                  0.75x {playbackRate === 0.75 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(1)}>
                  1x {playbackRate === 1 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(1.25)}>
                  1.25x {playbackRate === 1.25 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(1.5)}>
                  1.5x {playbackRate === 1.5 && "✓"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePlaybackRateChange(2)}>
                  2x {playbackRate === 2 && "✓"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {media.type === "video" && (
              <Button variant="ghost" size="icon" onClick={handleFullscreen} className="text-white hover:bg-white/20">
                <Maximize className="h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
