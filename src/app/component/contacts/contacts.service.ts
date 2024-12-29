import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private _httpService: HttpService,) { }

  getData() {
    return this._httpService.GET('/xlsx/import');
  }

  postData(data: any) {
    return this._httpService.POST('/xlsx/import/chunk', data);
  }
  deleteData(id: string) {
    return this._httpService.DELETE(`/xlsx/import/delete/${id}`);
  }
}
