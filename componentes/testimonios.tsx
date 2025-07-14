import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from "keen-slider/react"

export default function Testimonials() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 40,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 3,
          spacing:28
        },
      },
    },
  })

  const testimonios = [
    {
      nombre: "Lucía Mamani",
      negocio: "Café Illimani – La Paz",
      texto: "Fueron unas luces bonitas y me encantan. Mi rinconcito de café se ve más cálido y muchos me preguntan dónde las compré 😊",
      avatar: "LM",
    },
    {
      nombre: "Kevin Quispe",
      negocio: "KQ Tech – El Alto",
      texto: "Les puse en mi escritorio gamer y quedó brutal, se ve bien flama jaja. Buena calidad y no calientan.",
      avatar: "KQ",
    },
    {
      nombre: "Noemí Condori",
      negocio: "Estética Ñusta – Sopocachi",
      texto: "Decoré el espejo de mi sala con estas luces y se ve hermoso. Hasta mis clientas me han pedido dónde conseguirlas 💖",
      avatar: "NC",
    },
    {
      nombre: "Daniela Salazar",
      negocio: "Dani Nails – Miraflores",
      texto: "Muy lindas, las luces le dieron otro look a mi stand. Atraen más clientas y son súper fáciles de instalar.",
      avatar: "DS",
    },
    {
      nombre: "Jorge Gutiérrez",
      negocio: "JG Estudio – Obrajes",
      texto: "Puse una tira detrás del fondo para grabar y se ve mucho más profesional. Muy recomendado.",
      avatar: "JG",
    },
    {
      nombre: "Camila Ríos",
      negocio: "Cami Room – Alto Obrajes",
      texto: "Tenía miedo de instalar mal pero fue sencillo. Ilumina muy bonito y no molesta a la vista.",
      avatar: "CR",
    },
    {
      nombre: "Rodrigo Vargas",
      negocio: "AutoTuning RV – La Ceja",
      texto: "Las puse en los pedales y debajo del tablero. Quedó joya, se ve elegante sin ser exagerado.",
      avatar: "RV",
    },
    {
      nombre: "Tatiana López",
      negocio: "Photobooth TL – Calacoto",
      texto: "Las usamos para eventos y las fotos salen mucho mejor. Brillan bien incluso en exteriores.",
      avatar: "TL",
    },
    {
      nombre: "Álvaro Pinto",
      negocio: "Sala Gamer LPZ",
      texto: "Buen precio y calidad. Mis clientes dijeron que les gusta más el ambiente desde que puse las luces.",
      avatar: "AP",
    },
    {
      nombre: "Fernanda Morales",
      negocio: "Depto FM – Sopocachi",
      texto: "Solo quería decorar mi cuarto y la verdad superó mis expectativas. Ahora hasta hago TikToks con luz bonita.",
      avatar: "FM",
    },
  ]

  return (
    <section className="py-16 bg-gray-900/50 backdrop-blur-sm">
      <div className="container mx-auto ">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 animate-fade-in-up">Opiniones de Clientes</h2>
          <p className="text-base text-gray-400 animate-fade-in-up animation-delay-200 font-medium">
            Descubre lo que dicen nuestros clientes sobre nuestros productos
          </p>
        </div>

        <div ref={sliderRef} className="keen-slider">
          {testimonios.map((testimonio, i) => (
            <div
              key={i}
              className="keen-slider__slide bg-gray-800 border border-gray-700 rounded-xl hover:border-yellow-400 transition-all duration-500  group p-4"
            >
              <div className="flex items-center mb-3">
                <div className="mr-2 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs font-semibold">
                  {testimonio.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold">{testimonio.nombre}</p>
                  <p className="text-xs text-gray-400 font-medium">{testimonio.negocio}</p>
                </div>
              </div>

              <p className="text-gray-300 group-hover:text-white transition-colors duration-300 text-sm font-medium leading-relaxed">
                "{testimonio.texto}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
