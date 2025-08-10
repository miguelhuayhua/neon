import { Metadata } from 'next'
import ProductDetailPage from './client'
import { Publicacion } from '@/types/main'

const getProducto = async (id: string) => {
    return await fetch(`https://uayua.com/uayua/api/publicaciones/get?url=${id}&fields=id,titulo,imagenes,subtitulo,caracteristicas,estado,variantes:valores,opciones,coleccion,opciones:valores,opciones:id,variantes:id,variantes:titulo,variantes:estado,variantes:precio,descripcion,variantes:imagen,categorias:categoria`, {
        headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_UAYUA_TOKEN}`,
            'Origin': 'https://neobo.vercel.app'
        }
    })
}

// Generar metadatos dinámicos
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params

    try {
        const response = await getProducto(id)
        const producto = await response.json() as Publicacion;

        if (!producto || !producto.titulo) {
            return {
                title: 'Producto no encontrado',
                description: 'El producto que buscas no está disponible.',
            }
        }

        const titulo = producto.titulo
        const descripcion =  producto.subtitulo || `Descubre ${titulo} en nuestra tienda online.`
        const imagenPrincipal = producto.imagenes?.[0].url
        const precio = producto.variantes?.[0]?.precio || null
        return {
            title: `${titulo} | Neobo`,
            description: descripcion,
            keywords: [
                titulo,
                ...(producto.categorias?.map((cat: any) => cat.categoria) || []),
                'tienda online',
                'comprar',
            ].join(', '),

            // Open Graph
            openGraph: {
                title: titulo,
                description: descripcion,
                type: 'article',
                url: `https://neobo.vercel.app/catalogo/${id}`,
                images:
                {
                    url: imagenPrincipal,
                    width: 800,
                    height: 600,
                    alt: titulo,
                    protocol: "https",
                    href: imagenPrincipal
                }
                ,
                siteName: 'Neobo',
                locale: 'es_ES',
            },

            // Twitter Card
            twitter: {
                card: 'summary_large_image',
                title: titulo,
                description: descripcion,
                images: imagenPrincipal ? [imagenPrincipal] : [],
                creator: '@neobo',
                site: '@neobo',
            },

            // Metadatos para productos/ecommerce
            other: {
                'product:price:amount': precio?.toString() || '',
                'product:price:currency': 'USD', // Ajusta según tu moneda
                'product:availability': producto.estado ? 'in stock' : 'out of stock',
                'product:brand': 'Neobo', // Ajusta según corresponda
                'product:category': producto.categorias.at(0)?.categoria?.nombre || '',
            },

            // Canonical URL
            alternates: {
                canonical: `https://neobo.vercel.app/producto/${id}`,
            },

            // Robots
            robots: {
                index: producto.estado,
                follow: true,
                googleBot: {
                    index: producto.estado,
                    follow: true,
                },
            },

            // Metadatos adicionales
            category: 'product',
            classification: 'ecommerce',
        }
    } catch (error) {
        console.error('Error al generar metadatos:', error)
        return {
            title: 'Producto | Neobo',
            description: 'Descubre nuestros productos en Neobo.',
        }
    }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    try {
        const response = await getProducto(id)
        const producto = await response.json()

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`)
        }

        return (
            <>
                <ProductDetailPage publicacion={producto} />
            </>
        )
    } catch (error) {
        console.error('Error al cargar el producto:', error)
        return (
            <div>
                <h1>Error al cargar el producto</h1>
                <p>No se pudo cargar la información del producto.</p>
            </div>
        )
    }
}