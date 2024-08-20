import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NoticiaInsert, Noticias } from '../interface/noticias';
import { NoticiasResponse } from '../interface/responses';

@Injectable({
  providedIn: 'root'
})
export class NoticiasServiceService {
  #http = inject(HttpClient);
  #noticiasUrl = 'noticias';
  constructor() { }

  getNoticias(): Observable<Noticias[]> {
    return this.#http.get<NoticiasResponse>(this.#noticiasUrl).pipe(map((resp) => resp.noticias));
  }

  addNoticia(newNoticia: NoticiaInsert): Observable<Noticias> {
    return this.#http.post<Noticias>(this.#noticiasUrl, newNoticia).pipe(map((resp) => resp));
  }

  deleteNoticia(id: string): Observable<void> {
    return this.#http.delete<void>(`${this.#noticiasUrl}/${id}/delete`);
  }
}
