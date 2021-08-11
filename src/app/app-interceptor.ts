import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { environment } from '../environments/environment';
// const API_URL = environment.apiURL;

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let reqStream$ = next.handle(req);
    
    return reqStream$.pipe(
      catchError((err) => {
          console.log('im here')
        this.toastr.error(`${err.error.message}`,'Error')
        return throwError(err);
      })
    );
  }

}

export const appInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AppInterceptor,
  multi: true
};