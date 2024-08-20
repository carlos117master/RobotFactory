import { CommonModule } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../interface/usuario';
import { ProfileServicesService } from '../services/profile-services.service';

@Component({
  selector: 'register',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  #router = inject(Router);
  email!: string;
  saved = false;
  #registerService = inject(ProfileServicesService)
  repetirEmail!: string;
  password!: string;
  repetirPass!: string;
  imggBase64 = '';
  nickname!:string;
  @ViewChild('addForm') addForm! : NgForm;
  errorMessage: string = '';

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.imggBase64 = reader.result as string;
    });
  }
  
  compararEmails(): boolean{
    return this.email === this.repetirEmail;
  }
  COmpararPasswords(): boolean{
    return this.password === this.repetirPass;
  }
  validClasses(ngModel: NgModel, validClass: string, errorClass: string) {
    return {
      [validClass]: ngModel.touched && ngModel.valid,
      [errorClass]: ngModel.touched && ngModel.invalid
    };
  }
  
  /*addUser(){
    const newUser: Usuario ={
    nickname: this.nickname,
    email: this.email,
    password: this.password,
    avatar: this.imggBase64
  }
    if(this.compararEmails()){
    this.#registerService.Register(newUser).subscribe({
      next:() => {
        this.saved = true;
        this.#router.navigate(['/login']);
      },
      error:(error) => console.error(error)
    });
  }
  }*/
  addUser() {
    if (!this.compararEmails()) {
      this.errorMessage = 'Emails do not match.';
      alert(this.errorMessage);
      return;
    }else if (!this.COmpararPasswords()) {
      this.errorMessage = 'Passwords do not match.';
      alert(this.errorMessage);
      return;
    }else{
      const newUser: Usuario = {
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        avatar: this.imggBase64,
        role: 'USER_ROLE'
      };
      if (this.compararEmails()) {
        this.#registerService.Register(newUser).subscribe({
          next: () => {
            this.saved = true;
            this.#router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error during registration:', error);
            alert("usuario ya registrado, intenta cambiando el email o nickname")
          }
        });
      } else {
        this.errorMessage = 'Emails do not match.';
      }
    }
  }
    }
