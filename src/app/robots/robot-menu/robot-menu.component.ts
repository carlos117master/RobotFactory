import { Component, OnInit, computed, inject } from '@angular/core';
import { ProfileServicesService } from '../../auth/services/profile-services.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'robot-menu',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './robot-menu.component.html',
  styleUrl: './robot-menu.component.css'
})
export class RobotMenuComponent {
  #registerService = inject(ProfileServicesService)
  changeDetectorRef = inject(ChangeDetectorRef);
  
  logged = this.#registerService.logged;
  //logged = computed(() => this.#registerService.logged());
  ngOnInit(): void {
    // Check if the user is logged in when the component initializes
    this.#registerService.isLoggged().subscribe(loggedIn => {
      if (loggedIn) {
        this.logged = this.#registerService.logged;
        this.changeDetectorRef.detectChanges();
      }
    });
  }
  loggout(){
    this.#registerService.logout()
  }
}
