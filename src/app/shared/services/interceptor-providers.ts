import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FakeBackendInterceptor } from 'src/app/helper/fake-backend.interceptor';
import { AuthInterceptor } from './authentication/auth.interceptor';

export const interceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
];
