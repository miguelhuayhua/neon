"use client"

import { useState, useEffect, useRef } from "react"
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
  const hasMounted = useRef(false)

  // Sin opciones → establecer la variante disponible una sola vez
  useEffect(() => {
    if (opciones.length === 0 && !selectedVariant) {
      const availableVariant = variantes.find(v => v.estado) || variantes[0] || null
      setSelectedVariant(availableVariant)
      onVariantChange(availableVariant, {})
    }
  }, [opciones, variantes, selectedVariant, onVariantChange])

  // Con opciones → encontrar variante que coincida
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true
      return
    }

    if (opciones.length === 0) return

    const matchingVariant = variantes.find((variante) =>
      opciones.every((opcion) => {
        const selectedValue = selectedOptions[opcion.id]
        if (!selectedValue) return false
        return variante.valores.some((vv) => vv.valorOpcionId === selectedValue)
      })
    )

    if (matchingVariant?.id !== selectedVariant?.id) {
      setSelectedVariant(matchingVariant || null)
      onVariantChange(matchingVariant || null, selectedOptions)
    }
  }, [selectedOptions, opciones, variantes, onVariantChange])

  const handleOptionChange = (opcionId: string, valorId: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [opcionId]: valorId,
    }))
  }

  // Vista para productos sin opciones
  if (opciones.length === 0) {
    return (
      <div>
        <h3 className="text-white font-semibold mb-5">Variante Disponible</h3>
        <div className="space-y-2">
          {variantes.map((variante) => (
            <div className="flex text-md justify-between w-full items-center "
              key={variante.id}
             
              onClick={() => {
                if (variante.estado) {
                  setSelectedVariant(variante)
                  onVariantChange(variante, {})
                }
              }}
            >
              <span>{variante.titulo}</span>
              <span className="font-bold">
                Bs. {variante.precio.toFixed(2)}
                {!variante.estado && " (Agotado)"}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-4 items-center">
      <h3 className="font-semibold">
        Variantes disponibles
      </h3>
      {opciones.map((opcion) => (
        <div key={opcion.id} className="space-y-2">
          <label className="text-white font-medium text-sm">{opcion.nombre}</label>
          <div className="flex flex-wrap gap-2">
            {opcion.valores.map((valor) => {
              const isSelected = selectedOptions[opcion.id] === valor.id
              const isAvailable = variantes.some((variante) =>
                variante.valores.some((vv) => vv.valorOpcionId === valor.id && variante.estado),
              )

              return (
                <Button
                  key={valor.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={`${isSelected
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0"
                    : "border-gray-700 text-gray-300 hover:border-pink-500/50 hover:text-pink-300"
                    } capitalize ${!isAvailable ? "opacity-50 cursor-not-allowed" : ""}`}
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

      {/* Info de variante seleccionada */}
      {selectedVariant && (
        <div className="pt-3 w-full border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white font-medium">{selectedVariant.titulo}</p>
              <p className="text-sm text-gray-400">{selectedVariant.estado ? "En stock" : "Agotado"}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Bs. {selectedVariant.precio.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje de combinación no disponible */}
      {opciones.length > 0 && !selectedVariant && Object.keys(selectedOptions).length > 0 && (
        <div className="pt-3 border-t border-gray-700">
          <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Combinación no disponible</Badge>
        </div>
      )}
    </div>
  )
}
