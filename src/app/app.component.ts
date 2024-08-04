import { CommonModule  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './layout/header/header.component';  // Import HeaderComponent
import { SidebarComponent } from './layout/sidebar/sidebar.component';  // Import SidebarComponent
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, InputTextModule,   HeaderComponent,   // Declare HeaderComponent
    SidebarComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'nirmala-bag-rep';
  showHeaderAndSidebar = true;
  showSidebar = true;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const currentUrl = this.router.url;
      this.showHeaderAndSidebar = currentUrl !== '/login';
      this.showSidebar = currentUrl !== '/login'; // Adjust this if you want to hide/show the sidebar differently
    });
  }
}
