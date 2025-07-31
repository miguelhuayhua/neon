"use client"

import {
  Mail,
  MapPin,
  Phone,
  Star,
  Zap,
  ShoppingCart,
  Truck,
  Handshake,
  LoaderCircle,
} from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"


import Navbar from "@/componentes/navbar"
import Footer from "@/componentes/footer"
import HeroSection from "@/componentes/hero"
import { Publicacion } from "@/types/main"
import Testimonials from "@/componentes/testimonios"
import dynamic from "next/dynamic"
const Productos = dynamic(() => import("./products-list"), {
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
export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("todos");
  const [categorias, setCategorias] = useState<{ nombre: string, id?: string }[]>([{ nombre: "todos" }]);
  const [productos, setProductos] = useState<Publicacion[]>([]);
  const [productosFiltrados, setProductosFiltrados] = useState<Publicacion[]>([])


  useEffect(() => {
    fetch('https://uayua.com/uayua/api/publicaciones/getall?fields=titulo,imagenes,caracteristicas,estado,variantes,colecciones,categorias:categoria', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
      }
    }).then(res => res.json()).then(data => {
      setProductos(data);
      setProductosFiltrados(data);
    })
  }, [])
  useEffect(() => {
    fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
      }
    }).then(res => res.json()).then(data => [...data, { nombre: "todos", id: "" }]).then(data => {
      setCategorias(data);
      setIsVisible(true);
    })
  }, [])
  return (
    <div className="min-h-screen bg-gray-950 text-white relative font-inter">
      <Navbar />

      {/* Patrón de fondo con líneas infinitas en cuadrados */}
      <div className="fixed inset-0 z-0">
        <div className="grid-pattern"></div>
      </div>

      <div className="relative z-20">
        <HeroSection />

        {/* Products Section */}
        <section id="productos" className="py-16 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">Nuestros Productos</h2>
              <p className="text-base text-gray-400 animate-fade-in-up animation-delay-200 font-medium">
                Luces LED neón premium para cada necesidad
              </p>
            </div>

            {/* Category Filter */}
            <Tabs value={categoriaSeleccionada} onValueChange={(value) => {
              setCategoriaSeleccionada(value);
              if (value == 'todos') {
                setProductosFiltrados(productos);
              }
              else
                setProductosFiltrados(productos.filter(producto => producto.categorias.some(cat => cat.categoria?.nombre == value)))

            }} className="mb-10">
              <TabsList className="flex px-1  mx-auto gap-x-2 gap-y-1  h-fit flex-wrap">
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
            <Productos productosFiltrados={productosFiltrados} />

          </div>
        </section>


        {/* Testimonials */}
        <Testimonials />
        <section id="nosotros" className="p-15">
          {/* Nueva sección: Cómo Entregamos */}
          <div className=" text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">Cómo Entregamos</h2>
            <p className="text-base text-gray-400 animate-fade-in-up animation-delay-200 font-medium">
              Tu neón, directo a tus manos, con la máxima comodidad y seguridad.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            <Card className="bg-gray-800 border-gray-700 text-center hover:border-pink-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up">
              <CardContent className="p-4">
                <ShoppingCart className="w-8 h-8 mx-auto mb-3 text-pink-400 group-hover:animate-bounce" />
                <h3 className="text-sm font-semibold mb-2">Tienda Online 24/7</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  Explora y compra nuestra colección completa desde la comodidad de tu hogar, a cualquier hora.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center hover:border-purple-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-100">
              <CardContent className="p-4">
                <Truck className="w-8 h-8 mx-auto mb-3 text-purple-400 group-hover:animate-bounce" />
                <h3 className="text-sm font-semibold mb-2">Envíos a Domicilio</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  Realizamos envíos seguros y rápidos a toda España, directamente a tu puerta.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700 text-center hover:border-blue-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up animation-delay-200">
              <CardContent className="p-4">
                <Handshake className="w-8 h-8 mx-auto mb-3 text-blue-400 group-hover:animate-bounce" />
                <h3 className="text-sm font-semibold mb-2">Entregas Personales</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed">
                  Para mayor comodidad, ofrecemos entregas personales en puntos acordados en La Paz o Bolivia.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        {/* Contact Section */}
        <section id="contacto" className="py-16 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">Ponte en Contacto</h2>
                <p className="text-base text-gray-400 animate-fade-in-up animation-delay-200 font-medium">
                  ¿Necesitas un diseño personalizado o tienes preguntas? ¡Estamos aquí para ayudarte!
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="animate-slide-in-left">
                  <h3 className="text-lg font-bold mb-4">Información de Contacto</h3>
                  <div className="space-y-3">
                    {[
                      { icon: Phone, texto: "+591 69848691", etiqueta: "Llámanos" },
                      { icon: Mail, texto: "miguelhuayhuac2@gmail.com", etiqueta: "Escríbenos" },
                      { icon: MapPin, texto: "100% en línea", etiqueta: "Presencia" },
                    ].map((item, i) => (
                      <Card
                        key={i}
                        className={`bg-gray-800 border-gray-700 p-3 hover:border-rose-400 transition-all duration-300 animate-fade-in-left`}
                        style={{ animationDelay: `${i * 0.1}s` }}
                      >
                        <div className="flex items-center">
                          <item.icon className="w-4 h-4 text-rose-400 mr-2" />
                          <div>
                            <p className="text-xs text-gray-400 font-medium">{item.etiqueta}</p>
                            <p className="text-sm font-semibold">{item.texto}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
                <div className="animate-slide-in-right">
                  <Card className="bg-gray-800 border-gray-700 p-4">
                    <CardHeader className="p-0 ">
                      <CardTitle className="text-lg font-bold">Envíanos un mensaje</CardTitle>
                      <CardDescription className="text-sm font-medium">
                        Te responderemos en menos de 24 horas
                      </CardDescription>
                    </CardHeader>
                    <form className="space-y-3" onSubmit={(e) => {
                      e.preventDefault()
                      let formData = new FormData(e.target as HTMLFormElement);
                      let a = document.createElement('a');
                      a.href = `https://api.whatsapp.com/send?phone=59169848691&text=${encodeURIComponent(`Nombre: ${formData.get('nombre')}\nAsunto: ${formData.get('asunto')}\nMensaje: ${formData.get('mensaje')}`)}`;
                      a.target = '_blank';
                      a.click();
                      a.remove();
                    }
                    }>
                      <Input
                        id="nombre"
                        name="nombre"
                        placeholder="Nombre" className="bg-gray-700 border-gray-600 text-sm font-medium " />
                      <Input
                        name="asunto"
                        placeholder="Asunto" className="bg-gray-700 border-gray-600 text-sm font-medium" />
                      <Textarea
                        name="mensaje"
                        placeholder="Tu Mensaje"
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-sm font-medium"
                      />
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-sm font-medium">
                        Enviar Mensaje
                      </Button>
                    </form>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
