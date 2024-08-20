import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RobotPageComponent } from './robots/robot-page/robot-page.component';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { leavePageGuard } from './guards/leave-page.guard';
import { RobotNuevoComponent } from './robots/robot-nuevo/robot-nuevo.component';
import { numericIdGuard } from './guards/numeric-id.guard';
import { RobotDetalleComponent } from './robots/robot-detalle/robot-detalle.component';
import { TociasPageComponent } from './toticias/tocias-page/tocias-page.component';
import { NoticiasNuevaComponent } from './toticias/noticias-nueva/noticias-nueva.component';
import { robotRoutes } from './robots/robot.routes'; 

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    { path:'register', component: RegisterComponent},
    { path: 'robots', component: RobotPageComponent },
    { path: 'home', component: HomeComponentComponent },
    { path: 'noticias', component: TociasPageComponent },
    { path: 'robots/:id/edit', component: RobotNuevoComponent },
    { 
        path: 'noticias/nueva',
        canDeactivate: [leavePageGuard],
        component: NoticiasNuevaComponent
    },
    { 
        path: 'robots/nuevo', 
        canDeactivate: [leavePageGuard],
        component: RobotNuevoComponent
    },
    { path: 'robots/:id', component: RobotDetalleComponent},
    ...robotRoutes,
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];
