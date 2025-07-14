"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.jpg"
          alt="Colección de Luces Neón"
          fill
          className="object-cover"
          priority
        />
        {/* Multiple overlay layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-purple-900/60 to-rose-900/70"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40"></div>
      </div>

      {/* Animated Background Effects */}
      <div className="absolute inset-0 z-10">
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-rose-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-bounce opacity-50"></div>

        {/* Neon glow effects */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mt-5 mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 mb-6 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Badge className="bg-gradient-to-r from-rose-500/30 to-purple-500/30 text-rose-300 border border-rose-400/50 backdrop-blur-sm px-4 py-2 text-sm font-medium shadow-lg shadow-rose-500/25">
              <Zap className="w-4 h-4 mr-2" />
              Luces LED Neón Variados
            </Badge>
          </div>

          {/* Main Heading */}
          <h1
            className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1500 delay-200 leading-tight ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              ILUMINA
            </span>
            <br />
            <span className="text-white drop-shadow-2xl">TU MUNDO</span>
          </h1>

          {/* Description */}
          <p
            className={`text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Descubre nuestra colección de luces led y neónes exclusivos para la decoración del hogar, tenemos todo para{" "}
            <span className="text-rose-400 font-semibold">iluminar tu espacio</span>.
          </p>

          {/* Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center mb-8 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button
              className="bg-gradient-to-r from-rose-500 to-purple-600 hover:bg-white/20 text-white shadow-lg hover:shadow-purple-800/20  transition-all duration-300 group px-8 py-3 font-semibold"
              asChild
            >
              <Link href="/catalogo">
                Ver Catálogo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="text-rose-300  hover:text-rose-200 bg-black/30 backdrop-blur-sm transition-all duration-300 px-8 py-3  font-semibold "
            >
              <Sparkles className="size-4" />
              Contactarnos
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <div className="w-6 h-10 border-2 border-rose-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-rose-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
