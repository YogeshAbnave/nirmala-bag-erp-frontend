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

interface Client {
  _id?: any;
  name?: any;
  address?: any;
  city?: any;
  createdAt?: any;
  email?: any;
  industry?: any;
  mobile?: any;
  updatedAt?: any;
  landmark?: any;
  size?: any;
  imagePreview?: any;
  imageFile?: any;
  discussion?: any;
  imageUrls?:any;
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
    `:host ::ng-deep .p-dialog .client-image {
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
      contactDialog: boolean = false;
      contacts!: Client[];
      client!: Client;
      selectedContacts!: Client[] | null;
      submitted: boolean = false;
      statuses!: any[];
      Array = Array;
    
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
          this.client = {};
          this.submitted = false;
          this.contactDialog = true;
      }
  
      applyFilterGlobal(event: Event) {
          const input = event.target as HTMLInputElement;
          const value = input.value;
          this.table.filterGlobal(value, 'contains');
        }
  
      deleteSelectedContacts() {
          this.confirmationService.confirm({
              message: 'Are you sure you want to delete the selected contacts?',
              header: 'Confirm',
              icon: 'pi pi-exclamation-triangle',
              accept: () => {
                  this.contacts = this.contacts.filter((val) => !this.selectedContacts?.includes(val));
                  this.selectedContacts = null;
                  this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Contacts Deleted', life: 3000 });
              }
          });
      }
  
      editContact(client: Client) {
          this.client = { ...client };
          this.contactDialog = true;
      }

  
  
      hideDialog() {
          this.contactDialog = false;
          this.submitted = false;
      }
  
      deleteContact(e: any) {
        const confirmDelete = window.confirm('Are you sure you want to delete this client?');
        
        if (confirmDelete) {
          this.clientService.deleteData(e).subscribe(
            (data: any) => {
              console.log('Client deleted successfully');
              this.fetchData(); // Refresh data after deletion
            },
            (error:any) => {
              console.error('Error deleting client:', error);
            }
          );
        }
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
        this.contacts = data;
        if (data.length) {
          this.headers = Object.keys(data[0]);
        }
      });
    }
  

   
    exportToExcel(): void {
      const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.excelData);
      const workbook: XLSX.WorkBook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
      FileSaver.saveAs(data, 'ExportedData.xlsx');
    }



      // Image Upload Handler
  onImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.client.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
      this.client.imageFile = file;
    }
  }

  // Save Client Data
  saveClient() {
    this.submitted = true;
  
    // Validate Required Fields
    if (!this.client.name || !this.client.mobile || !this.client.city || !this.client.size) {
      return;
    }

    const formData = new FormData();
    formData.append('name', this.client.name);
    formData.append('mobile', this.client.mobile);
    formData.append('email', this.client.email);
    formData.append('address', this.client.address);
    formData.append('landmark', this.client.landmark);
    formData.append('city', this.client.city);
    formData.append('size', this.client.size);
    formData.append('discussion', this.client.discussion);
  
    // Append image if a new file is selected
    if (this.client.imageFile) {
      formData.append('images', this.client.imageFile);
    }
  
    if (this.client._id) {
      this.clientService.updateClient(this.client._id, formData).subscribe(
        (response: any) => {
          console.log('Client updated successfully:', response);
          this.fetchData();
          alert('Client updated successfully');
          this.hideDialog(); 
        },
        (error: any) => {
          console.error('Error updating client:', error);
          alert('Error updating client');
        }
      );
    } else {
      this.clientService.postData(formData).subscribe(
        (response: any) => {
          console.log('Client added successfully:', response);
          this.fetchData();
          alert('Client added successfully');
          this.hideDialog(); 
        },
        (error: any) => {
          console.error('Error adding client:', error);
          alert('Error adding client');
        }
      );
    }
  }
  

}
