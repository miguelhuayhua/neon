"use client"

import { Check, Grid3X3, Heart, List, Search, ShoppingCart, Star, SlidersHorizontal, Eye, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

const todosLosProductos = [
  {
    id: 1,
    nombre: "Letrero Comercial Personalizado",
    precio: 299,
    precioOriginal: 399,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Comercial",
    calificacion: 4.9,
    resenas: 127,
    caracteristicas: ["Diseño Personalizado", "Resistente al Agua", "Control Remoto", "Garantía 2 Años"],
    colores: ["Rosa", "Azul", "Verde", "Blanco", "Rojo"],
    masVendido: true,
    descripcion: "Letrero LED neón personalizado perfecto para tu negocio. Diseño único y alta visibilidad.",
  },
  {
    id: 2,
    nombre: "Tira LED Neón Flexible",
    precio: 89,
    precioOriginal: 129,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Hogar",
    calificacion: 4.7,
    resenas: 89,
    caracteristicas: ["5m de Longitud", "Control por App", "Sincronización Musical", "Fácil Instalación"],
    colores: ["RGB", "Blanco Cálido", "Blanco Frío"],
    oferta: true,
    descripcion: "Tira LED flexible de 5 metros con control inteligente y efectos musicales.",
  },
  {
    id: 3,
    nombre: "Letrero Neón 'Abierto'",
    precio: 149,
    precioOriginal: null,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Comercial",
    calificacion: 4.8,
    resenas: 203,
    caracteristicas: ["Listo para Usar", "Bajo Consumo", "Pantalla Brillante", "Montaje Fácil"],
    colores: ["Rojo/Azul", "Verde/Rojo", "Azul/Blanco"],
    popular: true,
    descripcion: "Letrero 'Abierto' clásico para comercios. Instalación inmediata y gran visibilidad.",
  },
  {
    id: 4,
    nombre: "Neón Gaming RGB",
    precio: 199,
    precioOriginal: 249,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Gaming",
    calificacion: 4.9,
    resenas: 156,
    caracteristicas: ["Temas Gaming", "Reactivo al Sonido", "Múltiples Efectos", "Alimentación USB"],
    colores: ["RGB", "Púrpura", "Cian", "Naranja"],
    nuevo: true,
    descripcion: "Iluminación gaming RGB con efectos reactivos al sonido y múltiples patrones.",
  },
  {
    id: 5,
    nombre: "Letrero Neón Café",
    precio: 179,
    precioOriginal: null,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Comercial",
    calificacion: 4.6,
    resenas: 92,
    caracteristicas: ["Diseño Café", "LED Eficiente", "Fácil Montaje", "Resistente"],
    colores: ["Amarillo", "Naranja", "Blanco"],
    descripcion: "Letrero especializado para cafeterías con diseño atractivo y colores cálidos.",
  },
  {
    id: 6,
    nombre: "Neón Decorativo Corazón",
    precio: 69,
    precioOriginal: 89,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Hogar",
    calificacion: 4.5,
    resenas: 78,
    caracteristicas: ["Forma Corazón", "Luz Suave", "Batería Recargable", "Portátil"],
    colores: ["Rosa", "Rojo", "Blanco"],
    oferta: true,
    descripcion: "Neón decorativo en forma de corazón, perfecto para dormitorios y espacios íntimos.",
  },
  {
    id: 7,
    nombre: "Panel LED Gaming Pro",
    precio: 349,
    precioOriginal: 449,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Gaming",
    calificacion: 4.8,
    resenas: 134,
    caracteristicas: ["Panel Grande", "Sincronización PC", "Efectos Avanzados", "Control Táctil"],
    colores: ["RGB", "Multicolor"],
    nuevo: true,
    descripcion: "Panel LED gaming profesional con sincronización PC y efectos avanzados.",
  },
  {
    id: 8,
    nombre: "Letrero Neón Restaurante",
    precio: 259,
    precioOriginal: null,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Comercial",
    calificacion: 4.7,
    resenas: 167,
    caracteristicas: ["Diseño Elegante", "Alta Durabilidad", "Colores Vibrantes", "Garantía Extendida"],
    colores: ["Rojo", "Amarillo", "Verde", "Azul"],
    descripcion: "Letrero neón elegante para restaurantes con colores vibrantes y diseño profesional.",
  },
  {
    id: 9,
    nombre: "Tira LED Inteligente",
    precio: 119,
    precioOriginal: 159,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Hogar",
    calificacion: 4.6,
    resenas: 201,
    caracteristicas: ["Control Voz", "App Móvil", "Temporizador", "Dimmer"],
    colores: ["RGB", "Blanco Variable"],
    descripcion: "Tira LED inteligente con control por voz y aplicación móvil avanzada.",
  },
  {
    id: 10,
    nombre: "Neón Personalizado Logo",
    precio: 399,
    precioOriginal: 499,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Personalizado",
    calificacion: 4.9,
    resenas: 89,
    caracteristicas: ["100% Personalizado", "Diseño Único", "Consultoría Gratis", "Instalación Incluida"],
    colores: ["Todos los Colores"],
    masVendido: true,
    descripcion: "Neón completamente personalizado con tu logo o diseño. Incluye consultoría y instalación.",
  },
  {
    id: 11,
    nombre: "Kit Gaming Completo",
    precio: 289,
    precioOriginal: 359,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Gaming",
    calificacion: 4.8,
    resenas: 145,
    caracteristicas: ["Kit Completo", "Múltiples Piezas", "Sincronización", "Fácil Setup"],
    colores: ["RGB", "Personalizable"],
    popular: true,
    descripcion: "Kit completo de iluminación gaming con múltiples piezas sincronizadas.",
  },
  {
    id: 12,
    nombre: "Neón Ambiente Sala",
    precio: 139,
    precioOriginal: null,
    imagen: "/placeholder.svg?height=300&width=300",
    categoria: "Hogar",
    calificacion: 4.4,
    resenas: 112,
    caracteristicas: ["Luz Ambiente", "Regulable", "Modos Presets", "Control Remoto"],
    colores: ["Blanco Cálido", "RGB"],
    descripcion: "Iluminación ambiente perfecta para salas de estar con múltiples modos y control remoto.",
  },
]

const categorias = ["Todos", "Comercial", "Hogar", "Gaming", "Personalizado"]

export default function CatalogoPage() {
  const [productos, setProductos] = useState(todosLosProductos)
  const [busqueda, setBusqueda] = useState("")
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos")
  const [ordenamiento, setOrdenamiento] = useState("relevancia")
  const [vistaGrid, setVistaGrid] = useState(true)
  const [rangoPrecios, setRangoPrecios] = useState([0, 500])
  const [filtroCalificacion, setFiltroCalificacion] = useState(0)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)

  // Filtrar productos
  const productosFiltrados = productos.filter((producto) => {
    const coincideBusqueda =
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      producto.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaSeleccionada === "Todos" || producto.categoria === categoriaSeleccionada
    const coincidePrecio = producto.precio >= rangoPrecios[0] && producto.precio <= rangoPrecios[1]
    const coincideCalificacion = producto.calificacion >= filtroCalificacion

    return coincideBusqueda && coincideCategoria && coincidePrecio && coincideCalificacion
  })

  // Ordenar productos
  const productosOrdenados = [...productosFiltrados].sort((a, b) => {
    switch (ordenamiento) {
      case "precio-asc":
        return a.precio - b.precio
      case "precio-desc":
        return b.precio - a.precio
      case "calificacion":
        return b.calificacion - a.calificacion
      case "nombre":
        return a.nombre.localeCompare(b.nombre)
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-950 text-white relative font-inter">
      {/* Patrón de fondo */}
      <div className="fixed inset-0 z-0">
        <div className="grid-pattern"></div>
      </div>

      <div className="relative z-20">
        {/* Header */}
        <header className="border-b border-gray-800 backdrop-blur-sm bg-gray-950/90 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center justify-between">
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  NEÓN STORE
                </span>
              </Link>
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-sm text-gray-300 hover:text-pink-400 transition-colors font-medium">
                  Inicio
                </Link>
                <Link href="/catalogo" className="text-sm text-pink-400 font-medium">
                  Catálogo
                </Link>
                <Link
                  href="/#contacto"
                  className="text-sm text-gray-300 hover:text-pink-400 transition-colors font-medium"
                >
                  Contacto
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="hover:bg-pink-500/20 text-gray-300">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-pink-500/20 relative text-gray-300">
                  <ShoppingCart className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs px-1 py-0">3</Badge>
                </Button>
              </div>
            </nav>
          </div>
        </header>

        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-pink-400 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white">Catálogo</span>
          </div>
        </div>

        {/* Page Header */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              Catálogo de Productos
            </h1>
            <p className="text-base text-gray-400 font-medium">
              Descubre toda nuestra colección de luces LED neón premium
            </p>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-4 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full lg:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Buscar productos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-sm"
                />
              </div>

              {/* Category Filter */}
              <Tabs value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada}>
                <TabsList className="bg-gray-800 border-gray-700">
                  {categorias.map((categoria) => (
                    <TabsTrigger
                      key={categoria}
                      value={categoria}
                      className="data-[state=active]:bg-pink-500 data-[state=active]:text-white text-xs font-medium"
                    >
                      {categoria}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              {/* Sort */}
              <Select value={ordenamiento} onValueChange={setOrdenamiento}>
                <SelectTrigger className="w-48 bg-gray-800 border-gray-700 text-sm">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  <SelectItem value="relevancia">Relevancia</SelectItem>
                  <SelectItem value="precio-asc">Precio: Menor a Mayor</SelectItem>
                  <SelectItem value="precio-desc">Precio: Mayor a Menor</SelectItem>
                  <SelectItem value="calificacion">Mejor Calificación</SelectItem>
                  <SelectItem value="nombre">Nombre A-Z</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={vistaGrid ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setVistaGrid(true)}
                  className="bg-gray-800 hover:bg-pink-500"
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={!vistaGrid ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setVistaGrid(false)}
                  className="bg-gray-800 hover:bg-pink-500"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              {/* Filters Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="bg-gray-800 hover:bg-pink-500"
              >
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>

            {/* Advanced Filters */}
            {mostrarFiltros && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Rango de Precios</label>
                    <div className="px-2">
                      <Slider
                        value={rangoPrecios}
                        onValueChange={setRangoPrecios}
                        max={500}
                        min={0}
                        step={10}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>€{rangoPrecios[0]}</span>
                        <span>€{rangoPrecios[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Calificación Mínima</label>
                    <Select
                      value={filtroCalificacion.toString()}
                      onValueChange={(value) => setFiltroCalificacion(Number(value))}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="0">Todas las calificaciones</SelectItem>
                        <SelectItem value="4">4+ estrellas</SelectItem>
                        <SelectItem value="4.5">4.5+ estrellas</SelectItem>
                        <SelectItem value="4.8">4.8+ estrellas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Features Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Características</label>
                    <div className="space-y-2">
                      {["Control Remoto", "Resistente al Agua", "RGB", "App Control"].map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={feature} className="border-gray-600" />
                          <label htmlFor={feature} className="text-xs text-gray-400">
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-gray-400">
              Mostrando {productosOrdenados.length} de {todosLosProductos.length} productos
            </p>
          </div>

          {/* Products Grid/List */}
          {vistaGrid ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {productosOrdenados.map((producto, i) => (
                <Card
                  key={producto.id}
                  className="bg-gray-800 border-gray-700 hover:border-pink-400 transition-all duration-300 hover:scale-105 group cursor-pointer relative overflow-hidden"
                >
                  {/* Product Badges */}
                  <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                    {producto.masVendido && (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                        🏆 Más Vendido
                      </Badge>
                    )}
                    {producto.oferta && (
                      <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">🔥 Oferta</Badge>
                    )}
                    {producto.nuevo && (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">✨ Nuevo</Badge>
                    )}
                    {producto.popular && (
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 text-xs">
                        ⭐ Popular
                      </Badge>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-pink-500/20 p-1"
                  >
                    <Heart className="w-3 h-3" />
                  </Button>

                  <CardHeader className="p-0">
                    <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                      <Image
                        src={producto.imagen || "/placeholder.svg"}
                        alt={producto.nombre}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Quick Actions */}
                      <div className="absolute bottom-2 left-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="sm" className="flex-1 bg-pink-500 hover:bg-pink-600 text-xs">
                          <Eye className="w-3 h-3 mr-1" />
                          Ver
                        </Button>
                        <Button size="sm" className="flex-1 bg-purple-500 hover:bg-purple-600 text-xs">
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          Añadir
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                        {producto.categoria}
                      </Badge>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-400">
                          {producto.calificacion} ({producto.resenas})
                        </span>
                      </div>
                    </div>

                    <CardTitle className="text-sm mb-2 group-hover:text-pink-400 transition-colors duration-300 leading-tight">
                      {producto.nombre}
                    </CardTitle>

                    <p className="text-xs text-gray-400 mb-3 line-clamp-2">{producto.descripcion}</p>

                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-pink-400">€{producto.precio}</span>
                      {producto.precioOriginal && (
                        <span className="text-xs text-gray-500 line-through">€{producto.precioOriginal}</span>
                      )}
                    </div>

                    <div className="space-y-1 mb-3">
                      {producto.caracteristicas.slice(0, 2).map((caracteristica, j) => (
                        <div key={j} className="flex items-center text-xs text-gray-400">
                          <Check className="w-3 h-3 text-green-400 mr-1 flex-shrink-0" />
                          <span>{caracteristica}</span>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-2 bg-gray-700" />

                    <div className="flex items-center justify-between">
                      <div className="flex space-x-1">
                        {producto.colores.slice(0, 3).map((color, j) => (
                          <div
                            key={j}
                            className="w-3 h-3 rounded-full border border-gray-600"
                            style={{
                              backgroundColor:
                                color.toLowerCase() === "rgb"
                                  ? "#ff0080"
                                  : color.toLowerCase() === "rosa"
                                    ? "#ec4899"
                                    : color.toLowerCase() === "azul"
                                      ? "#3b82f6"
                                      : color.toLowerCase() === "verde"
                                        ? "#10b981"
                                        : color.toLowerCase() === "blanco"
                                          ? "#ffffff"
                                          : color.toLowerCase() === "rojo"
                                            ? "#ef4444"
                                            : color.toLowerCase() === "amarillo"
                                              ? "#f59e0b"
                                              : color.toLowerCase() === "naranja"
                                                ? "#f97316"
                                                : color.toLowerCase(),
                            }}
                          ></div>
                        ))}
                        {producto.colores.length > 3 && (
                          <span className="text-xs text-gray-400">+{producto.colores.length - 3}</span>
                        )}
                      </div>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-xs"
                      >
                        Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {productosOrdenados.map((producto) => (
                <Card
                  key={producto.id}
                  className="bg-gray-800 border-gray-700 hover:border-pink-400 transition-all duration-300 group"
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={producto.imagen || "/placeholder.svg"}
                          alt={producto.nombre}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                        {/* Badges */}
                        <div className="absolute top-1 left-1 flex flex-col gap-1">
                          {producto.masVendido && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">🏆</Badge>
                          )}
                          {producto.oferta && (
                            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-xs">🔥</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="text-lg font-semibold group-hover:text-pink-400 transition-colors">
                              {producto.nombre}
                            </h3>
                            <Badge variant="outline" className="text-xs border-gray-600 text-gray-400 mt-1">
                              {producto.categoria}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-pink-400">€{producto.precio}</div>
                            {producto.precioOriginal && (
                              <div className="text-sm text-gray-500 line-through">€{producto.precioOriginal}</div>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{producto.descripcion}</p>
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{producto.calificacion}</span>
                            <span className="text-xs text-gray-400">({producto.resenas} reseñas)</span>
                          </div>
                          <div className="flex space-x-1">
                            {producto.colores.slice(0, 4).map((color, j) => (
                              <div
                                key={j}
                                className="w-4 h-4 rounded-full border border-gray-600"
                                style={{
                                  backgroundColor:
                                    color.toLowerCase() === "rgb"
                                      ? "#ff0080"
                                      : color.toLowerCase() === "rosa"
                                        ? "#ec4899"
                                        : color.toLowerCase(),
                                }}
                              ></div>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {producto.caracteristicas.slice(0, 3).map((caracteristica, j) => (
                              <Badge key={j} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                {caracteristica}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm" className="hover:bg-pink-500/20">
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-pink-500 hover:bg-pink-600">
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                            <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
                              <ShoppingCart className="w-4 h-4 mr-1" />
                              Comprar
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* No Results */}
          {productosOrdenados.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">No se encontraron productos</h3>
                <p className="text-sm">Intenta ajustar tus filtros de búsqueda</p>
              </div>
              <Button
                onClick={() => {
                  setBusqueda("")
                  setCategoriaSeleccionada("Todos")
                  setRangoPrecios([0, 500])
                  setFiltroCalificacion(0)
                }}
                className="bg-pink-500 hover:bg-pink-600"
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
