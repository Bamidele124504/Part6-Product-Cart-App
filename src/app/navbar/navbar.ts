import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SearchInputComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  @Input() cartCount = 0;
  @Output() search = new EventEmitter<string>();

  onSearchChange(value: string) {
    this.search.emit(value);
  }
}
