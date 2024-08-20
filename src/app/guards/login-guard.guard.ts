import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ProfileServicesService } from '../auth/services/profile-services.service';
import { map } from 'rxjs';

export const loginGuardGuard: CanActivateFn = (route, state) => {
  const profileService = inject(ProfileServicesService);
  const router = inject(Router);

  return profileService.isLoggged().pipe(
    map((resp)=>{
      if(resp){
        return true;
      }else {
        return router.createUrlTree(['/auth/login']);
      }
    })
  )
};
