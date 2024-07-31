import { CommonModule  } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { HeaderComponent } from './layout/header/header.component';  // Import HeaderComponent
import { SidebarComponent } from './layout/sidebar/sidebar.component';  // Import SidebarComponent


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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showHeaderAndSidebar = !event.url.includes('login');
      }
    });
  }
}
