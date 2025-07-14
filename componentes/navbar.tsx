"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Zap, Menu, X } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isScrolled
          ? "backdrop-blur-md bg-black/30 border-b border-rose-500/20 shadow-lg shadow-rose-500/10"
          : "backdrop-blur-sm bg-transparent"
        }`}
    >
      {/* Animated border effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-rose-500/20 to-transparent h-px bottom-0"></div>

      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10    rounded-xl flex border  items-center justify-center shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 transition-all duration-300 group-hover:scale-110">
                <Zap className="w-5 h-5 text-rose-400" />
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-purple-500 to-blue-500 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-rose-400 via-purple-400 to-blue-400 bg-clip-text text-transparent group-hover:from-rose-300 group-hover:via-purple-300 group-hover:to-blue-300 transition-all duration-300">
               NEÖ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Productos", href: "#productos" },
              { name: "Personalizado", href: "#personalizado" },
              { name: "Nosotros", href: "#nosotros" },
              { name: "Contacto", href: "#contacto" },
            ].map((item, i) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative text-sm font-medium text-gray-300 hover:text-white transition-all duration-300 group animate-fade-in-up`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {item.name}
                {/* Hover effect */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                {/* Glow effect on hover */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-rose-400 to-purple-400 blur-sm group-hover:w-full transition-all duration-300 opacity-60"></span>
              </Link>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {/* Wishlist */}
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="relative  text-gray-300 hover:text-rose-300 transition-all duration-300 "
            >
              <Link href="/favoritos">
                <Heart className="size-5" />
                {/* Wishlist count */}
              </Link>
            </Button>

        

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-gray-300 hover:text-rose-300 hover:bg-rose-500/20 transition-all duration-300"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0"
            }`}
        >
          <div className="bg-black/40 backdrop-blur-md rounded-lg border border-rose-500/20 p-4 shadow-lg shadow-rose-500/10">
            <div className="flex flex-col space-y-3">
              {[
                { name: "Productos", href: "#productos" },
                { name: "Personalizado", href: "#personalizado" },
                { name: "Nosotros", href: "#nosotros" },
                { name: "Contacto", href: "#contacto" },
              ].map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-rose-300 transition-all duration-300 py-2 px-3 rounded-md hover:bg-rose-500/20 border border-transparent hover:border-rose-500/30"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
