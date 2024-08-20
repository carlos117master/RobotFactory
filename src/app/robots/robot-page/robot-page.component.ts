import { Component, inject } from '@angular/core';
import { RobotCardComponent } from '../robot-card/robot-card.component';
import { Robots } from '../interface/robots';
import { CommonModule } from '@angular/common';
import { RobotServiceService } from '../services/robot-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'robot-page',
  standalone: true,
  imports: [RobotCardComponent,CommonModule, CommonModule, RouterLink],
  templateUrl: './robot-page.component.html',
  styleUrl: './robot-page.component.css'
})
export class RobotPageComponent {
  #robotService = inject(RobotServiceService);
  robots: Robots[] = [];

  /*addRobot(newRobot: Robots){
    newRobot.id = Math.max(...this.robots.map(p => p.id!)) + 1;
    this.robots.push(newRobot);
  }*/ 

  ngOnInit(): void {
    this.#robotService
      .getRobots()
      .subscribe({
        next: (robot) => {(this.robots = robot);
        },
        error: (error) => console.error(error)
      });
  }

  deleteRobot(robotToDelete:Robots){
    this.robots = this.robots.filter(p => p !== robotToDelete);
  }
}
