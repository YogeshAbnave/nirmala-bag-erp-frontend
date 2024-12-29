import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts() {
    return Promise.resolve([
        {
          name: 'Abhijeet',
          description: 'Abhijeet',
          price: '100',
          image: '',
          category: 'Abhijeet',
          subCategory: 'Abhijeet',
          size: 'Abhijeet',
          bestseller: 'Abhijeet',
      }


    ]);
}


}
