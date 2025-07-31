"use client";
import dynamic from "next/dynamic"
const Producto = dynamic(() => import("@/componentes/producto"), {
    ssr: false,
    loading: () => <div className="animate-pulse bg-gray-800 h-64 rounded-lg"></div>,
});
import { Publicacion } from "@/types/main";

interface Props { productosFiltrados: Publicacion[] }
export default function Productos({ productosFiltrados }: Props) {
    return (
        <>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {productosFiltrados.map((producto, i) => (
                    <Producto key={i.toString()} publicacion={producto} />
                ))}
            </div>
        </>
    )
}