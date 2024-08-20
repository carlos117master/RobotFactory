import { Component, Input, OnInit, inject } from '@angular/core';
import { AbstractControl, FormControl, NonNullableFormBuilder, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Usuario } from '../../auth/interface/usuario';
import { CommonModule } from '@angular/common';
import { RobotServiceService } from '../services/robot-service.service';
import { Router } from '@angular/router';
import { RobotInsert } from '../interface/robots';
import { CanComponentDeactivate } from '../../interface/can-component-deactivate';

@Component({
  selector: 'robot-nuevo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './robot-nuevo.component.html',
  styleUrl: './robot-nuevo.component.css'
})
export class RobotNuevoComponent implements CanComponentDeactivate, OnInit {
  ngOnInit(): void {
    console.log(this.id);
    if(this.id){
      this.edit = true;
      this.#robotService.getRobot(this.id).subscribe({
        next: (robot) => {
          console.log(robot);
          this.title.setValue(robot.titulo!);
          this.description.setValue(robot.descripcion!);
          this.imggBase64 = robot.imagen!;
        },
        error: (error) => console.error(error)
      });
    }else{
      this.resetRobot();
      this.edit = false;
    }
  }
  
  imggBase64 ='';
  @Input() id!:string;
  saved = false;
  user!: Usuario;
  edit:boolean = false;
  #robotService = inject(RobotServiceService);
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

    robotForm = this.#fb.group({
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

  canDeactivate(){
    return (this.saved || this.robotForm.pristine || confirm('¿seguro que quieres salir de la pagina? Los cambios no se guardaran'));
  }

  addRobot(){
      const robot: RobotInsert = {
        ...this.robotForm.getRawValue(),
        imagen: this.imggBase64,
        fecha: new Date().toString(),
      }
      if(this.edit){
        this.#robotService.editRobot(robot, this.id).subscribe({
          next: () =>{
            this.saved = true;
            this.#router.navigate(['/robots']);
          },
          error: (error: any) => {
            console.log(error)
            console.log("entro aqui");
          }
        })
      }else{
        this.#robotService.addRobot(robot).subscribe({
          next: () => {
            this.saved = true;
            this.#router.navigate(['/robots']);
          },
          error: (error: any) => {
            console.log(error)
            console.log("entro aqui");
          }
        });
      }
    }
    resetRobot(){
      this.robotForm.reset();
    }
  }
