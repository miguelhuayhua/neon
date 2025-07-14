"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Zap, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Publicacion } from "@/types/main"
import { toggleFavProduct } from "@/store/reducers/user"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { some } from "lodash"
interface ProductCardProps {
    publicacion: Publicacion
}

export default function ProductCard({ publicacion }: ProductCardProps) {
    const [isHovered, setIsHovered] = useState(false)
    const [imageError, setImageError] = useState(false)

    // Obtener la primera imagen ordenada
    const primaryImage = publicacion.imagenes.sort((a, b) => a.orden - b.orden)[0]
    const { favProducts } = useSelector((state: RootState) => state.user)
    const isFavourite = some(favProducts, (productId) => productId === publicacion.id)

    // Calcular rango de precios de las variantes activas
    const activeVariants = publicacion.variantes.filter((v) => v.estado)
    const prices = activeVariants.map((v) => v.precio)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("es-ES", {
            style: "currency",
            currency: "BOB",
        }).format(price)
    }

    const getPriceDisplay = () => {
        if (prices.length === 0) return "Precio no disponible"
        if (minPrice === maxPrice) return formatPrice(minPrice)
        return `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`
    }
    const dispatch = useDispatch()

    const handleToggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        dispatch(toggleFavProduct({ id: publicacion.id }))
    }


    return (
        <Link href={`/catalogo/${publicacion.id}`}>
            <Card
                className="group relative overflow-hidden p-0 bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50 hover:border-rose-500/50 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-rose-500/20 cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <CardContent className="p-0">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden">
                        {primaryImage && !imageError ? (
                            <Image
                                src={primaryImage.url || "/placeholder.svg"}
                                alt={publicacion.titulo}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <Zap className="w-16 h-16 text-gray-600" />
                            </div>
                        )}

                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Favorite button */}
                        <div
                            className={`absolute top-3 right-3 transition-all duration-300 `}
                        >
                            <button
                                onClick={handleToggleFavorite}
                                className="w-8 h-8 bg-black/50 backdrop-blur-sm hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 hover:text-rose-200 rounded-md flex items-center justify-center transition-all duration-300 hover:scale-110"
                            >
                                <Heart className={`w-4 h-4 ${isFavourite ? "fill-current text-rose-400" : ""}`} />
                            </button>
                        </div>

                        {/* Status badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {!publicacion.estado && (
                                <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">Agotado</Badge>
                            )}
                            {publicacion.colecciones.length > 0 && (
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
                                    {publicacion.colecciones[0].coleccion.nombre}
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-3">
                        {/* Categories */}
                        {publicacion.categorias.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                                {publicacion.categorias.slice(0, 2).map(({ categoria }) => (
                                    <Badge
                                        key={categoria.id}
                                        className="bg-rose-500/10 text-rose-400 border-rose-500/20 text-xs px-2 py-0.5"
                                    >
                                        {categoria.nombre}
                                    </Badge>
                                ))}
                                {publicacion.categorias.length > 2 && (
                                    <Badge className="bg-gray-500/10 text-gray-400 border-gray-500/20 text-xs px-2 py-0.5">
                                        +{publicacion.categorias.length - 2}
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Title and Subtitle */}
                        <div className="space-y-1">
                            <h3 className="font-semibold text-white text-lg leading-tight group-hover:text-rose-300 transition-colors duration-300 line-clamp-2">
                                {publicacion.titulo}
                            </h3>
                            {publicacion.subtitulo && <p className="text-sm text-gray-400 line-clamp-1">{publicacion.subtitulo}</p>}
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="text-xl font-bold bg-gradient-to-r from-rose-400 to-purple-400 bg-clip-text text-transparent">
                                    {getPriceDisplay()}
                                </p>
                                {activeVariants.length > 1 && (
                                    <p className="text-xs text-gray-500">{activeVariants.length} variantes disponibles</p>
                                )}
                            </div>


                        </div>

                        {/* Key Features */}
                        {publicacion.caracteristicas.length > 0 && (
                            <div className="pt-2 border-t border-gray-800">
                                <div className="flex flex-wrap gap-1">
                                    {publicacion.caracteristicas.slice(0, 3).map((caracteristica) => (
                                        <span
                                            key={caracteristica.id}
                                            className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full"
                                        >
                                            {caracteristica.nombre}: {caracteristica.valor}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
