import { Component, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileServicesService } from '../services/profile-services.service';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { UserLogin } from '../interface/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'login',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  #router = inject(Router);
  email!: string;
  saved = false;
  credentialsSub!: Subscription;
  #registerService = inject(ProfileServicesService)
  password!: string;
  @ViewChild('addForm') addForm! : NgForm;

  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }

  usuarioIncorrecto(){
    alert("usuario o contraseña incorrecto");
  }

  doLogin(){
    const login: UserLogin ={
      email: this.email,
      password: this.password,
  }
    this.#registerService.login(login).subscribe({
      next:() => {
        this.saved = true;
        this.#router.navigate(['/home']);
      },
      error:(error) =>{
        console.error(error),
        this.usuarioIncorrecto()
      }
    });
  }
}
