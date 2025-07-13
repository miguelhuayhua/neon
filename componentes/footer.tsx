"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        < footer className="bg-gray-900 border-t border-gray-800 py-10 backdrop-blur-sm" >
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="animate-fade-in-up">
                        <div className="flex items-center space-x-2 mb-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <Zap className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-lg font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                                Neón sets
                            </span>
                        </div>
                        <p className="text-gray-400 mb-3 text-sm font-medium leading-relaxed">
                            Luces LED neón premium para empresas y hogares en toda España.
                        </p>
                        <div className="flex space-x-3">
                            {["Facebook", "Instagram", "Twitter"].map((social, i) => (
                                <Button
                                    key={social}
                                    size="sm"
                                    variant="outline"
                                    className="border-gray-700 bg-transparent hover:border-pink-400 text-xs font-medium"
                                >
                                    {social}
                                </Button>
                            ))}
                        </div>
                    </div>
                    {[
                        {
                            titulo: "Productos",
                            enlaces: ["Letreros Comerciales", "Iluminación Hogar", "Neón Gaming", "Diseño Personalizado"],
                        },
                        {
                            titulo: "Soporte",
                            enlaces: ["Centro de Ayuda", "Información de Envío", "Devoluciones", "Garantía"],
                        },
                        {
                            titulo: "Empresa",
                            enlaces: ["Nosotros", "Contacto", "Opiniones", "Blog"],
                        },
                    ].map((seccion, i) => (
                        <div key={i} className={`animate-fade-in-up`} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                            <h4 className="text-sm font-semibold mb-3">{seccion.titulo}</h4>
                            <ul className="space-y-2 text-gray-400">
                                {seccion.enlaces.map((enlace, j) => (
                                    <li key={j}>
                                        <Link
                                            href="#"
                                            className="hover:text-pink-400 transition-colors duration-300 text-sm font-medium"
                                        >
                                            {enlace}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Separator className="my-6 bg-gray-800" />
                <div className="text-center text-gray-400 animate-fade-in-up animation-delay-800">
                    <p className="text-sm font-medium">
                        &copy; 2024 Neón Store. Todos los derechos reservados. | Política de Privacidad | Términos de Servicio
                    </p>
                </div>
            </div>
        </footer >
    )
}