import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { EMPTY, catchError } from 'rxjs';
import { RobotServiceService } from '../services/robot-service.service';
import { Robots } from '../interface/robots';

export const resolverResolver: ResolveFn<Robots> = (route) => {
  return inject(RobotServiceService).getRobot(route.params['id']).pipe(
    catchError(()=> {
      inject(Router).navigate(['/robots']);
      return EMPTY;
    })
  );
};