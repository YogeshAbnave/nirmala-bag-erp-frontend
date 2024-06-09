import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { CommonService } from '../_services/common.service';
import { Router } from '@angular/router';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private router: Router, private _commonService: CommonService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this._commonService.getSession() && this._commonService.getSession().token) {
      request = request.clone({
        setHeaders: {
          authorization: this._commonService.getSession().token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
       
        console.log(error,"error.status")
        console.log(error.error.message,"error.status")

        if (
          error.status === 401 && (error.error.message === "Authorization Required"
          || error.error.message === "could not find a valid user" || error.error.message === "could not find accessToken")
          ) {
          this._commonService.deleteSession();
          this.router.navigate(['']);
          this._commonService.errorToaster('Your session expired');
        } else if (error.status === 401 && error.error.message === "Authentication failed: invalid username or password") {
          this._commonService.errorToaster('Please enter correct email address or password.');
        }else if (error.status === 401 && error.error.message === "Entered email or password is incorrect, please try again with correct credentials.") {
          this._commonService.errorToaster('Please enter correct email address or password.');
        } else if (error.status === 401 && error.error.message === "Invalid Otp") {
          this._commonService.errorToaster('Please enter correct OTP.');
        } else if(error.status === 401 && error.error.message === "Invalid access token.") {
          this._commonService.errorToaster('Invalid access token.');
        } else if(error.status === 401 && error.error.message === "Invalid email or password.") {
          this._commonService.errorToaster('Invalid email or password.');
        } else if (error.status === 400 || error.status === 404) {
          this._commonService.errorToaster(error.error.message ? error.error.message : error.statusText);
        } else if ((error.status >= 500 && error.status <= 505) || error.status === 0) {
          this._commonService.errorToaster('Error, Something went wrong');
        } else if ((error.status == 422)) {
          if(error.error.details.codes.email[0] == 'uniqueness'){
            this._commonService.errorToaster('Email already exists');
          }else{
            this._commonService.errorToaster('Error, Something went wrong');
          }
        }
        return throwError(error);
      })
    );
  }
}
