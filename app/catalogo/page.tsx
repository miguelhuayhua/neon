"use client"

import { Check, Grid3X3, Heart, List, Search, ShoppingCart, Star, SlidersHorizontal, Eye, Zap, LoaderCircle } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Navbar from "@/componentes/navbar"
import Footer from "@/componentes/footer"
import dynamic from "next/dynamic"
const Productos = dynamic(() => import("./../products-list"), {
  ssr: false,
  loading: () => <>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>
      <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>
      <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>
      <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>
    </div>
  </>,
});
import { Categoria, Publicacion } from "@/types/main"

export default function CatalogoPage() {
  const [busqueda, setBusqueda] = useState("")
  const [categorias, setCategorias] = useState<Categoria[]>([{ id: "", nombre: "todos" }])
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos")

  const [productosFiltrados, setProductosFiltrados] = useState<Publicacion[]>([])
  const [rangoPrecios, setRangoPrecios] = useState([0, 500])
  const [filtroCalificacion, setFiltroCalificacion] = useState(0)
  const [mostrarFiltros, setMostrarFiltros] = useState(false)
  const [productos, setProductos] = useState<Publicacion[]>([]);

  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {

    fetch('https://uayua.com/uayua/api/publicaciones/getall?fields=titulo,imagenes,caracteristicas,estado,variantes,colecciones,categorias:categoria', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
      }
    }).then(res => res.json()).then(data => {
      setProductos(data)
      setProductosFiltrados(data)
    })
  }, []);
  useEffect(() => {
    fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
      }
    }).then(res => res.json()).then(data => [...data, { id: "", nombre: "todos" }]).then(data => {
      setCategorias(data);
      setIsVisible(true);
    })
  }, [])
  return (
    <div className="min-h-screen bg-gray-950 text-white relative font-inter">
      <Navbar />


      <div className="relative z-20 pt-20">


        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Link href="/" className="hover:text-rose-400 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <span className="text-white">Catálogo</span>
          </div>
        </div>

        {/* Page Header */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center space-y-5 mb-8">
            <h1 className="text-3xl md:text-4xl font-bold  bg-gradient-to-r from-purple-400 py-2 to-red-400 bg-clip-text text-transparent">
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
                  onChange={(e) => {
                    setCategoriaSeleccionada('todos')
                    setProductosFiltrados(productos.filter(producto => producto.titulo.toLowerCase().includes(e.target.value.toLowerCase())))
                    setBusqueda(e.target.value)
                  }}
                  className="pl-10 bg-gray-800 border-gray-700 text-sm"
                />
              </div>

              {/* Category Filter */}
              <Tabs value={categoriaSeleccionada} onValueChange={(value) => {
                setCategoriaSeleccionada(value);
                if (value == 'todos') {
                  setProductosFiltrados(productos);
                }
                else
                  setProductosFiltrados(productos.filter(producto => producto.categorias.some(cat => cat.categoria?.nombre == value)))

              }}>
                <TabsList className="bg-gray-800 border-gray-700">
                  {isVisible ? categorias.map((categoria) => (
                    <TabsTrigger
                      key={categoria.nombre}
                      value={categoria.nombre}
                      className="capitalize p-2"
                    >
                      {categoria.nombre}
                    </TabsTrigger>
                  )) : <LoaderCircle className="size-4 animate-spin" />}
                </TabsList>
              </Tabs>


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
              Mostrando {productosFiltrados.length} de {productos.length} productos
            </p>
          </div>

          <Productos productosFiltrados={productosFiltrados} />

          {/* No Results */}
          {productosFiltrados.length === 0 && (
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
                className="bg-rose-500 hover:bg-rose-600"
              >
                Limpiar Filtros
              </Button>
            </div>
          )}
        </section>
      </div >

      <Footer />
    </div >
  )
}
