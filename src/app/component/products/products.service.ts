import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private _httpService: HttpService,) { }





createProduct(product: any) {
  console.log(product, 'products');
  return this._httpService.POST('/product/add', product);
}


getAllProduct() {
  return this._httpService.GET('/product/list');
}


}
