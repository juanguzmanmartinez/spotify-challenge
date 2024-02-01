import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = environment.API_TOKEN;
  if (req.url.includes('api.spotify.com/v1')) {
    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req);
}
