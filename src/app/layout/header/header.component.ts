import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class AppHeaderComponent {
  @Output() dragSidebarClassEvent = new EventEmitter<void>();

  dragSidebar() {
    this.dragSidebarClassEvent.emit();
  }
}
