import { Routes } from '@angular/router';
import { numericIdGuard } from '../guards/numeric-id.guard';
import { loginGuardGuard } from '../guards/login-guard.guard';
import { leavePageGuard } from '../guards/leave-page.guard';
import { resolverResolver } from './resolvers/resolver.resolver';

export const robotRoutes: Routes =[
    {
        path: '', 
        title: 'robots | Robot Factory',    
        loadComponent: ()=> 
        import('./robot-page/robot-page.component').then((m) => m.RobotPageComponent
        ),
      },
      { 
        path: 'nuevo', 
        title: 'new robot | Robot Factory',    
        loadComponent: ()=> 
        import('./robot-nuevo/robot-nuevo.component').then((m) => m.RobotNuevoComponent
        ), 
      },
      { 
        
        path: ':id', 
        canActivate: [loginGuardGuard],
        resolve:{
          robots: resolverResolver,
        },
        loadComponent:() => 
            import('./robot-detalle/robot-detalle.component').then(
                (m) => m.RobotDetalleComponent
            ),
    },
    { 
      path: ':id/edit',
      canActivate:[numericIdGuard, loginGuardGuard],
      canDeactivate:[leavePageGuard], 
      resolve:{
          robots: resolverResolver,
      },
      title: 'edit',    
      loadComponent: ()=> 
      import('./robot-nuevo/robot-nuevo.component').then((m) => m.RobotNuevoComponent
      ), 
      data: {animation: 'robotForm'}
  },

];