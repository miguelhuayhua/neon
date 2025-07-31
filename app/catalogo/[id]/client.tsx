"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Handshake, Phone } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Star, ChevronRight, Loader } from "lucide-react"
import Link from "next/link"
import { Publicacion, Variante } from "@/types/main"
import Navbar from "@/componentes/navbar"
import Footer from "@/componentes/footer"
import ProductGallery from "@/componentes/product-gallery"
import VariantSelector from "@/componentes/variant-selector"


interface Props {
    publicacion:Publicacion
}
export default function ProductDetailPage({publicacion}:Props) {

    const params = useParams()
    if (!params.id) return

    const [product, setProduct] = useState<Publicacion | null>(publicacion)
    const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
    const [isFavorite, setIsFavorite] = useState(false)

    const handleVariantChange = (variant: Variante | null, options: Record<string, string>) => {
        setSelectedVariant(variant)
        setSelectedOptions(options)
    }


    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: product?.titulo,
                    text: product?.subtitulo,
                    url: window.location.href,
                })
            } catch (err) {
                console.log("Error sharing:", err)
            }
        } else {
            // Fallback: copiar URL al portapapeles
            navigator.clipboard.writeText(window.location.href)
        }
    }


    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-screen">
                    <Loader className="animate-spin" />
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-rose-900/20">
            <Navbar />

            <main className="pt-20 xl:mx-52 2xl:mx-82 mx-0 sm:mx-10 md:mx-40 ">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
                        <Link href="/" className="hover:text-rose-300 transition-colors">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/ejemplos-productos" className="hover:text-rose-300 transition-colors">
                            Productos
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-300">{product.titulo}</span>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-6">
                        {/* Product Gallery */}
                        <div>
                            <ProductGallery imagenes={product.imagenes} productTitle={product.titulo} />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div className="flex items-center gap-2 mb-2">
                                {product.colecciones.map(({ coleccion }) => (
                                    <Badge key={coleccion.id} className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                        {coleccion.nombre}
                                    </Badge>
                                ))}
                                {!product.estado && <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Agotado</Badge>}
                            </div>
                            <h1 className="text-3xl font-bold text-white mb-2">{product.titulo}</h1>
                            <p className="text-lg text-gray-300">{product.subtitulo}</p>
                            {product.categorias.map(({ categoria }) => (
                                <Badge key={categoria?.id} className="bg-rose-500/20 text-rose-400 border-rose-500/30">
                                    {categoria?.nombre}
                                </Badge>
                            ))}

                        </div>


                        {/* Variant Selector */}
                        <VariantSelector
                            opciones={product.opciones}
                            variantes={product.variantes}
                            onVariantChange={handleVariantChange}
                        />

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button
                                asChild
                                className="w-full  text-white  "
                                variant="default"

                            >
                                <Link href={`https://wa.me/59169848691?text=Hola, estoy interesado en el producto: ${product.titulo} - ${window.location.href}`} target="_blank">
                                    <Phone className="size-4" />
                                    Enviar mensaje a WhatsApp
                                </Link>
                            </Button>

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    className="flex-1 border-gray-700 text-gray-300 hover:border-rose-500/50 hover:text-rose-300 bg-transparent"
                                    onClick={() => setIsFavorite(!isFavorite)}
                                >
                                    <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-rose-400" : ""}`} />
                                    {isFavorite ? "En favoritos" : "Añadir a favoritos"}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-gray-700 text-gray-300 hover:border-purple-500/50 hover:text-purple-300 bg-transparent"
                                    onClick={handleShare}
                                >
                                    <Share2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 max-w-md w-full mx-auto">
                            <Card className="bg-transparent  text-center hover:border-pink-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up">
                                <CardContent >
                                    <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-pink-400 group-hover:animate-bounce" />
                                    <h3 className="text-sm font-semibold mb-2">Tienda Online 24/7</h3>

                                </CardContent>
                            </Card>
                            <Card className="bg-transparent text-center hover:border-purple-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-100">
                                <CardContent>
                                    <Truck className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:animate-bounce" />
                                    <h3 className="text-sm font-semibold mb-2">Envíos a Domicilio</h3>

                                </CardContent>
                            </Card>
                            <Card className="bg-transparent text-center hover:border-blue-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-200">
                                <CardContent >
                                    <Handshake className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:animate-bounce" />
                                    <h3 className="text-sm font-semibold mb-2">Entregas Personales</h3>

                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Description */}
                        <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                            <CardContent className="space-y-3">
                                <h2 className="text-xl font-bold text-white ">Descripción</h2>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line">{product.descripcion}</div>
                            </CardContent>
                        </Card>

                        {/* Specifications */}
                        <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                            <CardContent className="space-y-3" >
                                <h2 className="text-xl font-bold text-white ">Especificaciones</h2>
                                <div className="space-y-3">
                                    {product.caracteristicas.map((caracteristica, index) => (
                                        <div key={caracteristica.id}>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-400 capitalize">{caracteristica.nombre}</span>
                                                <span className="text-white capitalize font-medium">{caracteristica.valor}</span>
                                            </div>
                                            {index < product.caracteristicas.length - 1 && <Separator className="bg-gray-700" />}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    )
}
