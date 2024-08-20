import { CanActivateFn, Router } from '@angular/router';
import { ProfileServicesService } from '../auth/services/profile-services.service';
import { inject } from '@angular/core';
import { map } from 'rxjs';

export const logoutGuardGuard: CanActivateFn = () => {
  const profileService = inject(ProfileServicesService);
  const router = inject(Router);

  return profileService.isLoggged().pipe(
    map((resp)=>{
      if(resp){
        return router.createUrlTree(['/home']);
      }else {
        return true;
      }
    })
  )
};
