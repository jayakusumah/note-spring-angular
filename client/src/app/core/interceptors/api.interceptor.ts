import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { environment } from '../../../environtments/environtment';


export const apiInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const isExternal = req.url.startsWith('http://') || req.url.startsWith('https://');

  const apiReq = req.clone({
    url: isExternal ? req.url : `${environment.apiBaseUrl}${req.url}`
  });

  return next(apiReq);
};
