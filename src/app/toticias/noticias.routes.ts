import { Routes } from '@angular/router';


export const noticiasRoutes: Routes =[
    {
        path: '', 
        title: 'robots | Robot Factory',    
        loadComponent: ()=> 
        import('./tocias-page/tocias-page.component').then((m) => m.TociasPageComponent
        ),
      },
      { 
        path: 'nueva', 
        title: 'nueva noticia | Robot Factory',    
        loadComponent: ()=> 
        import('./noticias-nueva/noticias-nueva.component').then((m) => m.NoticiasNuevaComponent
        ), 
      },
];