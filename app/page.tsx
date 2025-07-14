"use client"

import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Phone,
  Star,
  Zap,
  ShoppingCart,
  Heart,
  Eye,
  Package,
  Truck,
  Shield,
  Award,
} from "lucide-react"
import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Producto from "@/componentes/producto"
import Navbar from "@/componentes/navbar"
import Footer from "@/componentes/footer"
import HeroSection from "@/componentes/hero"
import { Publicacion } from "@/types/main"

const categorias = ["Todos", "Comercial", "Hogar", "Gaming", "Personalizado"]

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos")
  const [items, setItems] = useState<Publicacion[]>([]);
  useEffect(() => {
    setIsVisible(true)
    fetch('https://uayua.com/uayua/api/publicaciones/getall?fields=titulo,imagenes,caracteristicas,variantes,colecciones,categorias', {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
      }
    }).then(res => res.json()).then(setItems)
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
            <Tabs value={categoriaSeleccionada} onValueChange={setCategoriaSeleccionada} className="mb-10">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-5 bg-gray-800 border-gray-700">
                {categorias.map((categoria) => (
                  <TabsTrigger
                    key={categoria}
                    value={categoria}

                  >
                    {categoria}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {items.map((producto, i) => (
                <Producto key={i.toString()} publicacion={producto} />
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">
                ¿Por Qué Elegir Nuestras Luces Neón?
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Shield,
                  titulo: "Productos funcionales",
                  descripcion: "Cobertura completa en todos los productos",
                  color: "blue",
                },
                {
                  icon: Truck,
                  titulo: "Envíos confiables",
                  descripcion: "El producto llega a sin problemas",
                  color: "green",
                },
                {
                  icon: Zap,
                  titulo: "Bajo Consumo",
                  descripcion: "Las luces neón hacen un mejor uso de la energía",
                  color: "yellow",
                },
                {
                  icon: Award,
                  titulo: "Variedad en calidad",
                  descripcion: "Tenemos a la venta todo tipo de calidad de luces",
                  color: "purple",
                },
              ].map((caracteristica, i) => (
                <Card
                  key={i}
                  className={`bg-gray-800 border-gray-700 text-center hover:border-${caracteristica.color}-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <caracteristica.icon
                      className={`w-8 h-8 mx-auto mb-3 text-${caracteristica.color}-400 group-hover:animate-bounce`}
                    />
                    <h3 className="text-sm font-semibold mb-2">{caracteristica.titulo}</h3>
                    <p className="text-gray-400 text-xs font-medium leading-relaxed">{caracteristica.descripcion}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">Opiniones de Clientes</h2>
              <p className="text-base text-gray-400 animate-fade-in-up animation-delay-200 font-medium">
                Descubre lo que dicen nuestros clientes sobre nuestros productos
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  nombre: "María González",
                  negocio: "Café Luna",
                  texto:
                    "El letrero neón personalizado transformó completamente nuestro escaparate. ¡Calidad increíble y los colores son muy vibrantes!",
                  calificacion: 5,
                  avatar: "MG",
                  producto: "Letrero Comercial Personalizado",
                },
                {
                  nombre: "Carlos Ruiz",
                  negocio: "Setup Gaming",
                  texto:
                    "Perfecto para mi habitación gaming. Los efectos RGB son increíbles y el control por app es súper fácil de usar.",
                  calificacion: 5,
                  avatar: "CR",
                  producto: "Neón Gaming RGB",
                },
                {
                  nombre: "Ana Martín",
                  negocio: "Decoradora",
                  texto:
                    "Me encantan las tiras LED neón. Fáciles de instalar y la función de sincronización musical es absolutamente genial.",
                  calificacion: 5,
                  avatar: "AM",
                  producto: "Tira LED Neón Flexible",
                },
              ].map((testimonio, i) => (
                <Card
                  key={i}
                  className={`bg-gray-800 border-gray-700 hover:border-yellow-400 transition-all duration-500 hover:scale-105 group animate-slide-in-up`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3">
                      <Avatar className="mr-2 w-8 h-8">
                        <AvatarFallback className="bg-rose-500 text-white text-xs font-semibold">
                          {testimonio.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-semibold">{testimonio.nombre}</p>
                        <p className="text-xs text-gray-400 font-medium">{testimonio.negocio}</p>
                      </div>
                    </div>

                    <div className="flex mb-2">
                      {[...Array(testimonio.calificacion)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 fill-yellow-400 text-yellow-400`} />
                      ))}
                    </div>

                    <p className="text-gray-300 mb-3 group-hover:text-white transition-colors duration-300 text-sm font-medium leading-relaxed">
                      "{testimonio.texto}"
                    </p>

                    <Badge variant="outline" className="text-xs border-rose-500/30 text-rose-400 font-medium">
                      Compra Verificada: {testimonio.producto}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {[
                { numero: "10.000+", etiqueta: "Clientes Satisfechos", color: "rose" },
                { numero: "50.000+", etiqueta: "Productos Vendidos", color: "purple" },
                { numero: "99.9%", etiqueta: "Tasa de Satisfacción", color: "blue" },
                { numero: "24/7", etiqueta: "Soporte al Cliente", color: "green" },
              ].map((estadistica, i) => (
                <div key={i} className={`animate-fade-in-up`} style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className={`text-2xl md:text-3xl font-bold mb-2 text-${estadistica.color}-400`}>
                    {estadistica.numero}
                  </div>
                  <div className="text-gray-400 text-sm font-medium">{estadistica.etiqueta}</div>
                  <Progress value={85 + i * 5} className="mt-2 h-1" />
                </div>
              ))}
            </div>
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
                      { icon: Phone, texto: "+34 91 234 5678", etiqueta: "Llámanos" },
                      { icon: Mail, texto: "hola@neonstore.es", etiqueta: "Escríbenos" },
                      { icon: MapPin, texto: "Madrid, España", etiqueta: "Visítanos" },
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
                    <CardHeader className="p-0 mb-4">
                      <CardTitle className="text-lg font-bold">Envíanos un mensaje</CardTitle>
                      <CardDescription className="text-sm font-medium">
                        Te responderemos en menos de 24 horas
                      </CardDescription>
                    </CardHeader>
                    <form className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <Input placeholder="Nombre" className="bg-gray-700 border-gray-600 text-sm font-medium" />
                        <Input placeholder="Apellidos" className="bg-gray-700 border-gray-600 text-sm font-medium" />
                      </div>
                      <Input
                        type="email"
                        placeholder="Correo Electrónico"
                        className="bg-gray-700 border-gray-600 text-sm font-medium"
                      />
                      <Input placeholder="Asunto" className="bg-gray-700 border-gray-600 text-sm font-medium" />
                      <Textarea
                        placeholder="Tu Mensaje"
                        rows={3}
                        className="bg-gray-700 border-gray-600 text-sm font-medium"
                      />
                      <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 text-sm font-medium">
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
