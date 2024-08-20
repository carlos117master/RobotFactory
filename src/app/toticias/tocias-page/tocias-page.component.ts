import { Component, inject } from '@angular/core';
import { TociasCardComponent } from "../tocias-card/tocias-card.component";
import { Noticias } from '../interface/noticias';
import { CommonModule } from '@angular/common';
import { NoticiasServiceService } from '../services/noticias-service.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'tocias-page',
    standalone: true,
    templateUrl: './tocias-page.component.html',
    styleUrl: './tocias-page.component.css',
    imports: [TociasCardComponent, TociasCardComponent, CommonModule, RouterLink]
})
export class TociasPageComponent {
noticias: Noticias[] = [];
#noticiasService = inject(NoticiasServiceService);

ngOnInit(): void {
    this.#noticiasService.getNoticias().subscribe({
        next: (noticias) => {
            this.noticias = noticias;
        },
        error: (error) => {
            console.error(error);
        }
    })
}

deleteNoticia(noticiaDelete: Noticias) {
    this.noticias = this.noticias.filter(p => p !== noticiaDelete);
}
}
