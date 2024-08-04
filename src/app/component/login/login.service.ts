import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private _httpService: HttpService,) { }

  login(data: any) {
    return this._httpService.POST('/admin/login', data);
  }
}
