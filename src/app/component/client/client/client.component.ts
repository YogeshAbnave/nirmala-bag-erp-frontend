import { Component, ViewChild } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { HttpClient } from '@angular/common/http';
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
import { Table } from 'primeng/table';
import { ClientService } from '../client.service';

interface Product {
  _id?: string;
  name?: string;
  address?: string;
  city?: string;
  createdAt?: string;
  email?: string;
  industry?: string;
  mobile?: number;
  updatedAt?: string;
}

@Component({
  selector: 'app-client',
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
    InputNumberModule
  ],
  providers: [MessageService, ConfirmationService],
  styles: [
    `:host ::ng-deep .p-dialog .product-image {
      width: 150px;
      margin: 0 auto 2rem auto;
      display: block;
    }`
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {
  @ViewChild('dt') table!: Table;
    excelData: any[] = [];
    headers: string[] = [];
    productDialog: boolean = false;
    products!: Product[];
    product!: Product;
    selectedProducts!: Product[] | null;
    submitted: boolean = false;
    statuses!: any[];
    constructor(private messageService: MessageService, private confirmationService: ConfirmationService, private clientService: ClientService) {}

    ngOnInit() {
        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
        this.fetchData();
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
                this.products = this.products.filter((val) => !this.selectedProducts?.includes(val));
                this.selectedProducts = null;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
            }
        });
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(e:any) {
      
    }
    saveProduct(){

    }

    findIndexById(id: string): any {
      
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string): "success" | "warning" | "danger" | undefined {
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

  // Fetch data from the backend
  fetchData(): void {
    this.clientService.getData().subscribe((data: any) => {
      console.log("data",data.data)
      this.products = data.data;
      if (data.length) {
        this.headers = Object.keys(data[0]);
      }
    });
  }



  onFileChange(event: any): void {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      alert('Please select a single file.');
      return;
    }
  
    const file: File = target.files[0];
  
    // Check if the file is not empty
    if (file.size === 0) {
      alert('File is empty');
      return;
    }
  
    const formData = new FormData();
    formData.append('chunk', file, file.name);
  
    this.clientService.postData(formData).subscribe(
      (response: any) => {
        alert('Data uploaded successfully');
        this.fetchData();
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  

  uploadFile(file: File): void {
    const chunkSize = 1 * 1024 * 1024; // 1MB chunk size
    let offset = 0;

    const uploadChunk = () => {
      if (offset < file.size) {
        const chunk = file.slice(offset, offset + chunkSize);
        const formData = new FormData();
        formData.append('chunk', chunk, file.name);
        formData.append('offset', offset.toString());
        formData.append('total', file.size.toString());

        this.clientService.postData(formData).subscribe(
          () => {
            console.log(`Uploaded chunk: ${offset} - ${offset + chunkSize}`);
            offset += chunkSize;
            uploadChunk();
          },
          (error) => {
            console.error('Error uploading chunk:', error);
          }
        );
      } else {
        console.log('File uploaded successfully!');
        this.fetchData();
      }
    };

    uploadChunk();
  }

 
  exportToExcel(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);
    const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    FileSaver.saveAs(data, 'ExportedData.xlsx');
  }
}
