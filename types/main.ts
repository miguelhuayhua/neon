export type ValorOpcion = {
  id: string;
  valor: string;
};

export type Opcion = {
  id: string;
  nombre: string;
  valores: ValorOpcion[];
};

export type Imagen = {
  id: string;
  url: string;
  orden: number;
  creadoEn: string;
};

export type Caracteristica = {
  id: string;
  nombre: string;
  valor: string;
  creadoEn: string;
};

export type VarianteValor = {
  id: string;
  valorOpcion: ValorOpcion;
  valorOpcionId: string;
};

export type Variante = {
  id: string;
  titulo: string;
  precio: number;
  creadoEn: string;
  estado: boolean;
  valores: VarianteValor[];
};

export type Categoria = {
  id: string;
  nombre: string;
};

export type CategoriaPublicacion = {
  publicacionId: string
  categoriaId: string
  categoria?: Categoria
}

export type Coleccion = {
  id: string;
  nombre: string;
};

export type Publicacion = {
  id: string;
  titulo: string;
  descripcion: string;
  subtitulo: string;
  url: string;
  estado: boolean;
  creadoEn: string;

  imagenes: Imagen[];
  caracteristicas: Caracteristica[];
  opciones: Opcion[];
  variantes: Variante[];

  categorias: CategoriaPublicacion[]

  colecciones: {
    coleccion: Coleccion;
  }[];
};
