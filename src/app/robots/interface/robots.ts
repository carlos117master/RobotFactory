import { Usuario } from "../../auth/interface/usuario";

export interface Robots {
    _id?: string;
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    fecha?: string;
    usuarios?: Usuario[],
    mine: boolean
}

export interface RobotInsert {
    titulo?: string;
    descripcion?: string;
    imagen?: string;
    fecha?: string;
}

export interface CommentInsert {
    text: string;
}

export interface Comment extends CommentInsert {
    id: string;
    text: string;
    date: string;
    robot?: Robots;
    usuario: Usuario;
}