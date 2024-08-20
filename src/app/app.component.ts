import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RobotMenuComponent } from './robots/robot-menu/robot-menu.component';
import { RobotFooterComponent } from './robots/robot-footer/robot-footer.component';
import { RobotPageComponent } from './robots/robot-page/robot-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,RobotMenuComponent, RouterLink, RouterLinkActive, RobotFooterComponent,RobotPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'robot-factory';
}
