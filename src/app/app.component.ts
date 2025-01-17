import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { AppHeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component'; // Import SidebarComponent
import { filter } from 'rxjs/operators';
// import "primeicons/primeicons.css";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    InputTextModule,
    AppHeaderComponent, // Use AppHeaderComponent here
    SidebarComponent,
  ],  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Fix typo: use `styleUrls` instead of `styleUrl`
})
export class AppComponent implements OnInit {
  title = 'nirmala-bag-rep';
  showHeaderAndSidebar = true;
  showSidebar = true;
  toggleClass = false; // New property for toggling class

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        const currentUrl = this.router.url;
        this.showHeaderAndSidebar = currentUrl !== '/login';
        this.showSidebar = currentUrl !== '/login'; // Adjust this if you want to hide/show the sidebar differently
      });
  }

  // Method to toggle class
  dragSidebarToggleClass() {
    this.toggleClass = !this.toggleClass;
  }
}
