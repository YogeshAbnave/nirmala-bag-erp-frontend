import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from './../login.service';
import { CommonService } from './../../http/common.service';

import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // loginForm!: FormGroup;
  submitted: boolean = false;
  submitFlag: boolean = false;
  loading = false;



  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    password: ['', Validators.required]
  });
  get form() { return this.loginForm.controls };
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private _commonService: CommonService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  // On submit
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      this.loading = true;
      this.submitFlag = true;
      this.loginService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log("response", response);
          let sessionData = {
            token: response?.token,
            userId: response?.userId,
            name: response?.name,
            email: response?.email,
            profilePic: response?.profilePic
          };
          this._commonService.setSession(sessionData);
          this._commonService.setProfilePic(response?.profilePic);
          this._commonService.setUserName(response?.name);
          this.router.navigate(['/dashboard']);
        },
        (error: any) => {
          // Handle error
          console.error(error);
        }
      ).add(() => {
        this.submitFlag = false;
        this.loading = false;
      });
    }
  }

}
