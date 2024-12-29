import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductService } from '../products.service';
import { Table } from 'primeng/table';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { EditorModule } from 'primeng/editor';

interface Product {
  id?: string;
  fisrtName?: string;
  middleName?: string;
  lastName?: string;
  contactNummer?: string;
  EmergencyContactNummer?: string;
  address?: string;
  permenantAddress?: string;
  experienceBagManufacturing?: string;
  experienceBagManufacturingDetails?: string;
  experienceSewingMachine?: string;
  experienceSewingMachineDetails?: string;
  status?: string;
  joiningDate?: string;
  skillSet?: string;
  designation?: string;


  name?: string;
description?: string;
price?: string;
image?: string;
category?: string;
subCategory?: string;
size?: string;
bestseller?: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    DialogModule,
    RippleModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextModule,
    InputTextareaModule,
    FileUploadModule,
    DropdownModule,
    TagModule,
    RadioButtonModule,
    RatingModule,
    InputNumberModule,
    NgMultiSelectDropDownModule,
    EditorModule
  ],
  providers: [MessageService, ConfirmationService],
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  productDialog: boolean = false;
  products!: Product[];
  product!: Product;
  selectedProducts!: Product[] | null;
  submitted: boolean = false;
  statuses!: any[];

  isLoading = false;

  dropdownList: { item_id: number; item_text: string }[] = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {};


  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // this.productService.getProducts().then((data) => (this.products = data));

    this.isLoading = true;

    this.productService.getProducts().then((data) => {
      // Once data is fetched, hide the preloader and assign the data
      this.isLoading = false;
      this.products = data;
    }).catch(() => {
      // Handle error and stop the preloader in case of failure
      this.isLoading = false;
      // You can add error handling logic here
    });

    this.statuses = [
      { label: 'INSTOCK', value: 'instock' },
      { label: 'LOWSTOCK', value: 'lowstock' },
      { label: 'OUTOFSTOCK', value: 'outofstock' },
    ];

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  applyFilterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.table.filterGlobal(value, 'contains');
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.fisrtName?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        // this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string): 'success' | 'warning' | 'danger' | undefined {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return undefined;
    }
  }

}
