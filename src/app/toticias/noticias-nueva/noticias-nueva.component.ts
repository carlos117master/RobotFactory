import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Usuario } from '../../auth/interface/usuario';
import { NoticiasServiceService } from '../services/noticias-service.service';
import { Router } from '@angular/router';
import { NoticiaInsert } from '../interface/noticias';

@Component({
  selector: 'app-noticias-nueva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './noticias-nueva.component.html',
  styleUrl: './noticias-nueva.component.css'
})
export class NoticiasNuevaComponent {
  imggBase64 ='';
  @Input() id!:string;
  saved = false;
  user!: Usuario;
  #noticiaService = inject(NoticiasServiceService);
  #router = inject(Router);

  #fb = inject(NonNullableFormBuilder);

  title = this.#fb.control('',[Validators.minLength(5), Validators.pattern("^[a-zA-Z][a-zA-Z ]*$")]);
  description = this.#fb.control('', [Validators.minLength(8)]);
  image = this.#fb.control('');


  formValidator(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const title =  c.get('title')?.value;
      const description = c.get('description')?.value;
      const image = c.get('image')?.value;
      if (title === "" && description === "" && (!image || image === "")){
        return { robotForm: true };
      }else{
        return  null;
      }
    };
  }

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files || fileInput.files.length === 0) { return; }
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
    this.imggBase64 = reader.result as string;
    });
    }

    noticiaForm = this.#fb.group({
      titulo: this.title,
      descripcion: this.description,
      imagen: this.image,
    },{validators: this.formValidator()});


    validClasses(control: FormControl, errorClass: string) {
      return {
        //[validClass]: ngModel.touched && ngModel.valid,
        [errorClass]: control.touched && control.invalid
      };
    }


    addNoticia(){
      const noticia: NoticiaInsert = {
        ...this.noticiaForm.getRawValue(),
        imagen: this.imggBase64,
        fecha: new Date().toString(),
      }

      this.#noticiaService.addNoticia(noticia).subscribe({
        next: () => {
          this.saved = true;
          this.#router.navigate(['/noticias']);
        },
        error: (error: any) => {
          console.log(error),
          alert("no tienes permisos suficientes para subir una noticia"); 
        }
      })
    }
}
