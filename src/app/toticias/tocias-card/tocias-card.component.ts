import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Noticias } from '../interface/noticias';
import { Usuario } from '../../auth/interface/usuario';
import { ProfileServicesService } from '../../auth/services/profile-services.service';
import { NoticiasServiceService } from '../services/noticias-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'tocias-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tocias-card.component.html',
  styleUrl: './tocias-card.component.css'
})
export class TociasCardComponent {
  @Input() noticia!: Noticias;
  @Output() deleted = new EventEmitter<void>();
  @Input() idUsuario!: string;
  infoUsuario!: Usuario;
  #profileService = inject(ProfileServicesService);
  #noticasService = inject(NoticiasServiceService);
  
  ngOnInit(): void {
    this.cargarUsuariosId(this.noticia);
    if (this.idUsuario) {
      this.datosUsuario(this.idUsuario);
    }
  }

  datosUsuario(idUsuario: string) {
    this.#profileService.obtenerDatosUsuario(idUsuario).subscribe({
      next:(user) => {this.infoUsuario = user
      },
      error:(error) => console.error(error)
    })
  }

  deleteNoticia(){
    this.#noticasService.deleteNoticia(this.noticia._id!).subscribe(() => this.deleted.emit());
  }


  cargarUsuariosId(noticia: Noticias): string | undefined {
    for (let i = 0; i < noticia.usuarios!.length; i++) {
      const userId = noticia.usuarios![i]._id;
      if (userId) {
        this.datosUsuario(userId);
        return;
      }
    }
    // Si no se encuentra ningún ID de usuario
    return undefined;
  }
}
