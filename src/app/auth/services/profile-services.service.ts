import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { SsrCookieService } from 'ngx-cookie-service-ssr';
import { UserLogin, Usuario } from '../interface/usuario';
import { Observable, Subject, catchError, map, of } from 'rxjs';
import { TokenResponse } from '../interface/responses';

@Injectable({
  providedIn: 'root'
})
export class ProfileServicesService {
  #auth = 'auth';
  #http = inject(HttpClient)
  cookieService = inject(SsrCookieService);
  //#logged: WritableSignal<boolean> = signal(false);
  #logged = signal(this.cookieService.check('token'));
  
  get logged() {
    return this.#logged.asReadonly();
  }

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true
  };

  Register(user: Usuario): Observable<void> {
    return this.#http.post<void>(`${this.#auth}/register`, user, this.httpOptions);
  }

  login(data: UserLogin): Observable<void> {
    return this.#http.post<TokenResponse>(`${this.#auth}/login`, data, this.httpOptions).pipe(
      map(r => {
        this.cookieService.set('token', r.token);
        console.log(r.token);
        this.#logged.set(true);
      })
    );
  }

  obtenerDatosUsuario(idUsuario: string): Observable<Usuario> {
    return this.#http.get<Usuario>(`${this.#auth}/${idUsuario}`, this.httpOptions);
  }

  logout(): void {
    this.cookieService.delete("token");
    this.#logged.set(false);
  }


isLoggged(): Observable<boolean> {
  if (this.#logged === signal(false) && !this.cookieService.check('token')) {
    return of(false);
  } else if (this.#logged === signal(true)) {
    return of(true);
  } else if (this.#logged === signal(true) && this.cookieService.check('token')) {
    return this.#http.get('auth/auth/validate').pipe(
      map(() => {
        this.#logged.set(true);
        return true;
      }),
      catchError(() => {
        this.cookieService.delete('token');
        return of(false);
      })
    );
  }
  return of(false);
}
}
