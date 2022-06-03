import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // req.headers brings original headers request
    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "kd_jskEF_fl_sdk"),
    });
    return next.handle(modifiedRequest);
    // return next.handle(req);
  }
}
