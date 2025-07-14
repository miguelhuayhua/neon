"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Expand } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Imagen } from "@/types/main"


interface ProductGalleryProps {
    imagenes: Imagen[]
    productTitle: string
}

export default function ProductGallery({ imagenes, productTitle }: ProductGalleryProps) {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [isFullscreen, setIsFullscreen] = useState(false)

    const sortedImages = imagenes.sort((a, b) => a.orden - b.orden)

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % sortedImages.length)
    }

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + sortedImages.length) % sortedImages.length)
    }

    if (sortedImages.length === 0) {
        return (
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-gray-500 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Image src="/placeholder.svg" alt="No image" width={32} height={32} className="opacity-50" />
                    </div>
                    <p>Sin imágenes disponibles</p>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-gradient-to-br from-gray-900/50 to-black/50 rounded-lg overflow-hidden border border-gray-800/50 group">
                <Image
                    src={sortedImages[currentImageIndex]?.url || "/placeholder.svg"}
                    alt={`${productTitle} - Imagen ${currentImageIndex + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Navigation Arrows */}
                {sortedImages.length > 1 && (
                    <>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={prevImage}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                            onClick={nextImage}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </>
                )}

                {/* Fullscreen Button */}
                <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300"
                    onClick={() => setIsFullscreen(true)}
                >
                    <Expand className="w-4 h-4" />
                </Button>

                {/* Image Counter */}
                {sortedImages.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md border border-white/20">
                        {currentImageIndex + 1} / {sortedImages.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {sortedImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                    {sortedImages.map((imagen, index) => (
                        <button
                            key={imagen.id}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 ${index === currentImageIndex
                                    ? "border-rose-500 shadow-lg shadow-rose-500/30"
                                    : "border-gray-700 hover:border-gray-600"
                                }`}
                        >
                            <Image
                                src={imagen.url || "/placeholder.svg"}
                                alt={`${productTitle} - Miniatura ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Fullscreen Modal */}
            {isFullscreen && (
                <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="relative max-w-4xl max-h-full">
                        <Image
                            src={sortedImages[currentImageIndex]?.url || "/placeholder.svg"}
                            alt={`${productTitle} - Imagen ampliada`}
                            width={800}
                            height={600}
                            className="max-w-full max-h-full object-contain"
                        />
                        <Button
                            variant="ghost"
                            className="absolute top-2 right-2 text-white hover:bg-white/20"
                            onClick={() => setIsFullscreen(false)}
                        >
                            ✕
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
