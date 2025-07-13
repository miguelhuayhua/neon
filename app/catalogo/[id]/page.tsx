"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Share2, Truck, Shield, RotateCcw, Star, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Publicacion, Variante } from "@/types/main"
import Navbar from "@/componentes/navbar"
import Footer from "@/componentes/footer"
import ProductGallery from "@/componentes/product-gallery"
import VariantSelector from "@/componentes/variant-selector"



export default function ProductDetailPage() {
    const params = useParams()
    const [product, setProduct] = useState<Publicacion | null>(null)
    const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)
    const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
    const [isFavorite, setIsFavorite] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProduct = async () => {
            setLoading(true)
            console.log('carga')
            fetch(`https://uayua.com/uayua/api/publicaciones/get?id=${params.id}&fields=id,titulo,imagenes,colecciones,variantes,categorias,caracteristicas,variantes:valores,opciones,opciones:valores`, {
                headers: {
                    Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
                }
            }).then(res=>res.json()).then(setProduct)

            setLoading(false)
        }

        if (params.id) {
            loadProduct()
        }
    }, [params.id])

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

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-pink-500/30 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-300">Cargando producto...</p>
                        <p className="text-sm text-gray-500 mt-2">ID: {params.id}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
                <Navbar />
                <div className="pt-20 flex items-center justify-center min-h-screen">
                    <div className="text-center max-w-md">
                        <h1 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h1>
                        <p className="text-gray-400 mb-4">
                            El producto con ID "<code className="bg-gray-800 px-2 py-1 rounded text-pink-300">{params.id}</code>" no
                            existe.
                        </p>

                        <div className="space-y-3">
                            <Button asChild className="bg-gradient-to-r from-pink-500 to-purple-500">
                                <Link href="/ejemplos-productos">Ver productos disponibles</Link>
                            </Button>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-pink-900/20">
            <Navbar />

            <main className="pt-20">
                <div className="container mx-auto px-4 py-8">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center space-x-2 text-sm text-gray-400 mb-8">
                        <Link href="/" className="hover:text-pink-300 transition-colors">
                            Inicio
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <Link href="/ejemplos-productos" className="hover:text-pink-300 transition-colors">
                            Productos
                        </Link>
                        <ChevronRight className="w-4 h-4" />
                        <span className="text-gray-300">{product.titulo}</span>
                    </nav>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* Product Gallery */}
                        <div>
                            <ProductGallery imagenes={product.imagenes} productTitle={product.titulo} />
                        </div>

                        {/* Product Info */}
                        <div className="space-y-6">
                            {/* Header */}
                            <div>
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

                                {/* Rating */}
                                <div className="flex items-center gap-2 mt-3">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-400">(4.8) • 127 reseñas</span>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="flex flex-wrap gap-2">
                                {product.categorias.map(({ categoria }) => (
                                    <Badge key={categoria.id} className="bg-pink-500/20 text-pink-400 border-pink-500/30">
                                        {categoria.nombre}
                                    </Badge>
                                ))}
                            </div>

                            {/* Variant Selector */}
                            <VariantSelector
                                opciones={product.opciones}
                                variantes={product.variantes}
                                onVariantChange={handleVariantChange}
                            />

                            {/* Quantity Selector */}
                            <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-white font-medium">Cantidad</label>
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 border-gray-700 text-gray-300 hover:border-pink-500/50 bg-transparent"
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            >
                                                -
                                            </Button>
                                            <span className="text-white font-medium w-8 text-center">{quantity}</span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="w-8 h-8 p-0 border-gray-700 text-gray-300 hover:border-pink-500/50 bg-transparent"
                                                onClick={() => setQuantity(quantity + 1)}
                                            >
                                                +
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Button
                                    className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-lg py-6"
                                  
                                    disabled={!selectedVariant || (!selectedVariant.estado && product.estado)}
                                >
                                    <ShoppingCart className="w-5 h-5 mr-2" />
                                    {!product.estado
                                        ? "Producto agotado"
                                        : selectedVariant
                                            ? `Añadir al carrito - €${(selectedVariant.precio * quantity).toFixed(2)}`
                                            : "Selecciona una variante"}
                                </Button>

                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        className="flex-1 border-gray-700 text-gray-300 hover:border-pink-500/50 hover:text-pink-300 bg-transparent"
                                        onClick={() => setIsFavorite(!isFavorite)}
                                    >
                                        <Heart className={`w-4 h-4 mr-2 ${isFavorite ? "fill-current text-pink-400" : ""}`} />
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

                            {/* Features */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <Truck className="w-5 h-5 text-green-400 mx-auto mb-1" />
                                    <p className="text-xs text-gray-300">Envío gratis</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <Shield className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                                    <p className="text-xs text-gray-300">2 años garantía</p>
                                </div>
                                <div className="text-center p-3 rounded-lg bg-gray-800/30 border border-gray-700/50">
                                    <RotateCcw className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                                    <p className="text-xs text-gray-300">30 días devolución</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Details */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Description */}
                        <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Descripción</h2>
                                <div className="text-gray-300 leading-relaxed whitespace-pre-line">{product.descripcion}</div>
                            </CardContent>
                        </Card>

                        {/* Specifications */}
                        <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Especificaciones</h2>
                                <div className="space-y-3">
                                    {product.caracteristicas.map((caracteristica, index) => (
                                        <div key={caracteristica.id}>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-400">{caracteristica.nombre}</span>
                                                <span className="text-white font-medium">{caracteristica.valor}</span>
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
