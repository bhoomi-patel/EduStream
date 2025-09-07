"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Clock } from "lucide-react"
import { MediaPlayer } from "@/components/media-player"

interface MediaItem {
  id: number
  title: string
  type: "video" | "audio"
  url: string
  thumbnail: string
  duration: string
}

interface MediaGalleryProps {
  media: MediaItem[]
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleMediaSelect = (mediaItem: MediaItem) => {
    setSelectedMedia(mediaItem)
    setIsPlaying(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Course Media</h2>
        <p className="text-muted-foreground">Interactive video and audio content to enhance your learning experience</p>
      </div>

      {/* Media Player */}
      {selectedMedia && (
        <Card className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{selectedMedia.title}</span>
              <Badge variant={selectedMedia.type === "video" ? "default" : "secondary"}>{selectedMedia.type}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <MediaPlayer media={selectedMedia} isPlaying={isPlaying} onPlayPause={setIsPlaying} />
          </CardContent>
        </Card>
      )}

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {media.map((item) => (
          <Card
            key={item.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedMedia?.id === item.id ? "ring-2 ring-primary" : ""
            }`}
            onClick={() => handleMediaSelect(item)}
          >
            <div className="aspect-video relative overflow-hidden rounded-t-lg">
              <img src={item.thumbnail || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <div className="bg-white/90 rounded-full p-3">
                  <Play className="h-6 w-6 text-primary" />
                </div>
              </div>
              <Badge className="absolute top-2 left-2" variant="secondary">
                {item.type}
              </Badge>
              <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {item.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold line-clamp-2">{item.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
