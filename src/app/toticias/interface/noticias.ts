import { Usuario } from "../../auth/interface/usuario";

export interface Noticias {
    _id?: string;
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    fecha?: string;
    usuarios?: Usuario[],
    mine: boolean,
}


export interface NoticiaInsert {
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    fecha?: string;
}