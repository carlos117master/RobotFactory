import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Robots } from '../interface/robots';
import { RobotServiceService } from '../services/robot-service.service';
import { Usuario } from '../../auth/interface/usuario';
import { ProfileServicesService } from '../../auth/services/profile-services.service';
//import * as mongoose from 'mongoose';

@Component({
  selector: 'robot-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './robot-card.component.html',
  styleUrl: './robot-card.component.css'
})
export class RobotCardComponent {
  @Input() robot!: Robots; 
  @Input() idUsuario!: string;
  infoUsuario?: Usuario;
  @Output() deleted = new EventEmitter<void>();
  likes!:number;
  #profileService = inject(ProfileServicesService);
  #robotService = inject(RobotServiceService);
  #router = inject(Router);

  ngOnInit(): void {
    this.cargarUsuariosId(this.robot);
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

  deleteRobot(){
    this.#robotService.deleteRobot(this.robot._id!).subscribe(() => this.deleted.emit());
  }

  cargarUsuariosId(robot: Robots): string | undefined {
    for (let i = 0; i < robot.usuarios!.length; i++) {
      const userId = robot.usuarios![i]._id;
      if (userId) {
        this.datosUsuario(userId);
        return userId;
      }
    }
    // Si no se encuentra ningún ID de usuario
    return undefined;
  }
  
  goToDetalle(){
    this.#router.navigate(['./robots/'+ this.robot._id])
  }

  /*deleteRobot(){
    this.#robotService.deleterobot(this.robot.id!).subscribe(() => this.deleted.emit());
  }*/
}
