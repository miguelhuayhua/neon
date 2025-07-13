"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Opcion, Variante } from "@/types/main"
interface VariantSelectorProps {
  opciones: Opcion[]
  variantes: Variante[]
  onVariantChange: (variant: Variante | null, selectedOptions: Record<string, string>) => void
}

export default function VariantSelector({ opciones, variantes, onVariantChange }: VariantSelectorProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [selectedVariant, setSelectedVariant] = useState<Variante | null>(null)

  // Encontrar la variante que coincide con las opciones seleccionadas
  useEffect(() => {
    if (opciones.length === 0) {
      // Si no hay opciones, seleccionar la primera variante disponible
      const availableVariant = variantes.find((v) => v.estado) || variantes[0] || null
      setSelectedVariant(availableVariant)
      onVariantChange(availableVariant, {})
      return
    }

    // Buscar variante que coincida con todas las opciones seleccionadas
    const matchingVariant = variantes.find((variante) => {
      return opciones.every((opcion) => {
        const selectedValue = selectedOptions[opcion.id]
        if (!selectedValue) return false

        return variante.valores.some((varianteValor) => varianteValor.valorOpcion.id === selectedValue)
      })
    })

    setSelectedVariant(matchingVariant || null)
    onVariantChange(matchingVariant || null, selectedOptions)
  }, [selectedOptions, opciones, variantes, onVariantChange])

  const handleOptionChange = (opcionId: string, valorId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [opcionId]: valorId,
    }))
  }

  // Si no hay opciones, mostrar solo las variantes directamente
  if (opciones.length === 0) {
    return (
      <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
        <CardContent className="p-4">
          <h3 className="text-white font-semibold mb-3">Variantes Disponibles</h3>
          <div className="space-y-2">
            {variantes.map((variante) => (
              <Button
                key={variante.id}
                variant={selectedVariant?.id === variante.id ? "default" : "outline"}
                className={`w-full justify-between ${
                  selectedVariant?.id === variante.id
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                    : "border-gray-700 text-gray-300 hover:border-pink-500/50 hover:text-pink-300"
                } ${!variante.estado ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={() => {
                  if (variante.estado) {
                    setSelectedVariant(variante)
                    onVariantChange(variante, {})
                  }
                }}
                disabled={!variante.estado}
              >
                <span>{variante.titulo}</span>
                <span className="font-bold">
                  €{variante.precio.toFixed(2)}
                  {!variante.estado && " (Agotado)"}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-gray-900/50 to-black/50 border border-gray-800/50">
      <CardContent className="p-4 space-y-4">
        {opciones.map((opcion) => (
          <div key={opcion.id} className="space-y-2">
            <label className="text-white font-medium text-sm">{opcion.nombre}</label>
            <div className="flex flex-wrap gap-2">
              {opcion.valores.map((valor) => {
                const isSelected = selectedOptions[opcion.id] === valor.id
                const isAvailable = variantes.some((variante) =>
                  variante.valores.some((vv) => vv.valorOpcion.id === valor.id && variante.estado),
                )

                return (
                  <Button
                    key={valor.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    className={`${
                      isSelected
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0"
                        : "border-gray-700 text-gray-300 hover:border-pink-500/50 hover:text-pink-300"
                    } ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
                    onClick={() => isAvailable && handleOptionChange(opcion.id, valor.id)}
                    disabled={!isAvailable}
                  >
                    {valor.valor}
                  </Button>
                )
              })}
            </div>
          </div>
        ))}

        {/* Selected Variant Info */}
        {selectedVariant && (
          <div className="pt-3 border-t border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{selectedVariant.titulo}</p>
                <p className="text-sm text-gray-400">{selectedVariant.estado ? "En stock" : "Agotado"}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  €{selectedVariant.precio.toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No variant selected message */}
        {opciones.length > 0 && !selectedVariant && Object.keys(selectedOptions).length > 0 && (
          <div className="pt-3 border-t border-gray-700">
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Combinación no disponible</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
