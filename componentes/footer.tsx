"use client";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Categoria } from "@/types/main";

export default function Footer() {
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    useEffect(() => {
        fetch('https://uayua.com/uayua/api/categorias/getall?fields=nombre,id', {
            method: "GET",
            headers: {
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`
            }
        }).then(res => res.json()).then(setCategorias)
    }, [])
    return (
        < footer className="bg-gray-900 border-t border-gray-800 py-10 backdrop-blur-sm" >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="animate-fade-in-up">
                        <div className="flex items-center space-x-2 mb-3">
                            <Image
                                src="/neo.png"
                                alt="Logo"
                                width={50}
                                height={50}
                                className="h-10 w-10 rounded-full"
                            />
                            <span className="text-xl text-white">Neö</span>
                        </div>
                        <p className="text-gray-400 mb-3 text-sm font-medium leading-relaxed">
                            Vendemos tiras LED neón de colores y otras categorías, listas para usar.
                        </p>

                    </div>
                    {[
                        {
                            titulo: "Categorías",
                            enlaces: categorias,
                        },

                    ].map((seccion, i) => (
                        <div key={i} className={`animate-fade-in-up`} style={{ animationDelay: `${(i + 1) * 0.1}s` }}>
                            <h4 className="text-sm font-semibold mb-3">{seccion.titulo}</h4>
                            <ul className="space-y-2 text-gray-400">
                                {seccion.enlaces.map((enlace, j) => (
                                    <li key={enlace.id}>
                                        <Link
                                            href="#"
                                            className="hover:text-rose-400 capitalize transition-colors duration-300 text-sm font-medium"
                                        >
                                            {enlace.nombre}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
                <Separator className="my-6 bg-gray-800" />
                <div className="text-center text-gray-400 animate-fade-in-up animation-delay-800 flex justify-center gap-1">
                    <div className="flex items-center gap-2 font-bold text-sm ">
                        <Zap className="size-4" /> Neö
                    </div>
                    <p className="text-sm font-medium">
                        &copy; {new Date().getFullYear()}  Todos los derechos reservados.
                    </p>
                </div>

                <small className="flex gap-1 text-gray-500 justify-center mt-8 items-center ">
                    <span>Powered by </span> <Image alt="logo"
                        width={50} height={20} src='/dark.png' className="mt-1" />
                </small>
            </div>
        </footer >
    )
}