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


  name?: any;
description?: any;
price?: any;
images?: File[];
category?: any[];
subCategory?: any;
size?: any;
bestseller?: any;
isAvailable?:any;
sellingPrice?:any;
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
  mainImage: any;
  images: File[] = [];
  mainImagePreview: string | null = null;
  secondaryImagePreviews: string[] = [];

  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.isLoading = true;

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
    this.getProduct();

  }

  getProduct(){
 this.productService.getAllProduct().subscribe({
      next: (response:any) => {
        console.log('Product created successfully', response);
        this.isLoading = false;
        this.products = response.data;
      },
      error: (error:any) => {
        console.error('Error creating product', error);
        // Handle error
      }
    })
  }
 


  onMainImageSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.mainImage = file;
      this.createImagePreview(file).then(preview => {
        this.mainImagePreview = preview;
      });
    }
  }

  onSecondaryImageSelect(event: any) {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file:any) => {
        this.images.push(file);
        this.createImagePreview(file).then(preview => {
          this.secondaryImagePreviews.push(preview);
        });
      });
    }
  }

  private createImagePreview(file: File): Promise<string> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  }

  onSubmit() {
    this.submitted = true;
     // Prepare FormData object
  const formData = new FormData();

  // Append product details to FormData
  formData.append('name', this.product.name);
  formData.append('description', this.product.description);
  formData.append('price', this.product.price);
  formData.append('sellingPrice', this.product.sellingPrice);
  formData.append('size', this.product.size || 'XL');
  formData.append('category', "Men");
  formData.append('subCategory', this.product.subCategory);
  formData.append('bestseller', this.product.bestseller);
  formData.append('isAvailable', this.product.isAvailable ? 'true' : 'false');

   // Append images to FormData (one by one)
   if (this.images && this.images.length > 0) {
    this.images.forEach((image: File) => {
      formData.append('images', image); // Add each file with the key 'images'
    });
  }

  // Debug to ensure FormData is correctly populated
  // for (const [key, value] of (formData as any).entries()) {
  //   console.log(key, formData.get(key));
  // }
 
  // Make the API call
  this.productService.createProduct(formData).subscribe({
          next: (response:any) => {
            console.log('Product created successfully', response);
            // Handle success
          },
          error: (error:any) => {
            console.error('Error creating product', error);
            // Handle error
          }
        });
  }

   validateForm(): boolean {
    return !!(this.product.name && 
              this.product.price && 
              // this.product.category.length && 
              this.product.subCategory && 
              this.product.description && 
              this.mainImage);
  }

  onItemSelect(item: any) {
    // Handle category selection
  }

  onSelectAll(items: any) {
    // Handle select all categories
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
    debugger
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.images
        this.product.images = this.images;
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
