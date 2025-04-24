import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable,finalize, tap } from "rxjs";
import { SpinnerService } from "../services/spinner.service";

@Injectable()

export class SpinnerInterceptor implements HttpInterceptor {
  constructor(private spinner: SpinnerService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.spinner.hide();
        }
      }),
      finalize(() => {
        this.spinner.hide();
      })
    );
  }
}