import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {


  constructor(private _httpService: HttpService,) { }

  getData() {
    return this._httpService.GET('/client/getAll');
  }

  postData(data: any) {
    return this._httpService.POST('/client/add', data);
  }

  updateClient(id: any, data:FormData) {
    return this._httpService.PUT(`/client/update/${id}`, data);
  }
  deleteData(id: string) {
    return this._httpService.DELETE(`/client/delete/${id}`);
  }
}
