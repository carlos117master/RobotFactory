import { Routes } from "@angular/router";

export const loginRoutes: Routes =[
    {
        path: '',
        title: 'Login | Angular Robot Login',
        loadComponent: () =>
          import('./login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      { 
        path: 'register', 
        title: 'register | Angular Robot',    
        loadComponent: ()=> 
        import('./register/register.component').then((m) => m.RegisterComponent
        ),
     }
]