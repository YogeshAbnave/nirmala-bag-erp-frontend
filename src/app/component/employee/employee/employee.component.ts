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
import { EmployeeService } from '../employee.service';
import { Table } from 'primeng/table';

interface Employee {
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
}

@Component({
  selector: 'app-employee',
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
  ],
  providers: [MessageService, ConfirmationService],
  styles: [
    `
      :host ::ng-deep .p-dialog .employee-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild('dt') table!: Table;
  employeeDialog: boolean = false;
  employees!: Employee[];
  employee!: Employee;
  selectedEmployees!: Employee[] | null;
  submitted: boolean = false;
  statuses!: any[];

  isLoading = false;

  constructor(
    private employeeService: EmployeeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    // this.employeeService.getEmployees().then((data) => (this.employees = data));

    this.isLoading = true;

    this.employeeService.getEmployees().then((data) => {
      // Once data is fetched, hide the preloader and assign the data
      this.isLoading = false;
      this.employees = data;
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
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.employeeDialog = true;
  }

  applyFilterGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.table.filterGlobal(value, 'contains');
  }

  deleteSelectedEmployees() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected employees?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(
          (val) => !this.selectedEmployees?.includes(val)
        );
        this.selectedEmployees = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employees Deleted',
          life: 3000,
        });
      },
    });
  }

  editEmployee(employee: Employee) {
    this.employee = { ...employee };
    this.employeeDialog = true;
  }

  deleteEmployee(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter((val) => val.id !== employee.id);
        this.employee = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.employeeDialog = false;
    this.submitted = false;
  }

  saveEmployee() {
    this.submitted = true;

    if (this.employee.fisrtName?.trim()) {
      if (this.employee.id) {
        this.employees[this.findIndexById(this.employee.id)] = this.employee;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Updated',
          life: 3000,
        });
      } else {
        this.employee.id = this.createId();
        // this.employee.image = 'employee-placeholder.svg';
        this.employees.push(this.employee);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Employee Created',
          life: 3000,
        });
      }

      this.employees = [...this.employees];
      this.employeeDialog = false;
      this.employee = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id) {
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
