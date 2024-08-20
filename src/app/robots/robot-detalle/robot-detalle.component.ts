import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommentInsert, Robots,Comment } from '../interface/robots';
import { RobotServiceService } from '../services/robot-service.service';
import { FormsModule, NgForm } from '@angular/forms';
import { RobotCardComponent } from '../robot-card/robot-card.component';

@Component({
  selector: 'robot-detalle',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, RobotCardComponent],
  templateUrl: './robot-detalle.component.html',
  styleUrl: './robot-detalle.component.css'
})
export class RobotDetalleComponent implements OnInit {
  @Input() id!:string;
  robot!: Robots;
  #robotService = inject(RobotServiceService);
  comments?: Comment[] = [];
  comment!: string;
  saved = false;
  @ViewChild('addForm') addForm! : NgForm;
  #router = inject(Router);

  ngOnInit(): void {
    this.#robotService
      .getRobot(this.id)
      .subscribe({
        next: (robot) => 
          (this.robot = robot),
        error: (error) => console.error(error)
      });
      console.log('Valor de this.id:', this.id);
    this.#robotService.getComments(this.id).subscribe({
      next:(post) => {
        console.log('Respuesta del servicio getComments:', post);
        (this.comments = post.comentarios)
      },
      error: (error) => console.error(error)
    });
  }


  addComment(){
    const newComment: CommentInsert ={
      text: this.comment
    }
    this.#robotService.sendComment(this.id, newComment).subscribe({
      next:(c: Comment) =>{
        console.log("subi comentario: " + c);
        this.comments?.push(c);
        this.saved = true;
        this.addForm.resetForm();
        this.comment = '';
      }
    })
  }
      
  goback(){
    this.#router.navigate(['/robots']);
  }
}
