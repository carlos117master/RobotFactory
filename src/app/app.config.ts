import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { interceptorInterceptor } from './Interceptor/interceptor.interceptor';
import { interceptorAuthInterceptor } from './auth/interceptor/interceptor-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding(),withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([interceptorInterceptor, interceptorAuthInterceptor])),
  ]
};
