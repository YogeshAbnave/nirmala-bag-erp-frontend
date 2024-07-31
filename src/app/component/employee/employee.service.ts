import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // constructor(private http: HttpClient) { }
  getProducts() {
    return Promise.resolve([
        { id: '1000', name: 'Product 1', description: 'Product 1 Description', price: 100, category: 'Category 1', quantity: 24, inventoryStatus: 'INSTOCK', rating: 5 },
        { id: '1001', name: 'Product 2', description: 'Product 2 Description', price: 200, category: 'Category 2', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 4 },
        // Add more dummy products as needed
    ]);
}


}
