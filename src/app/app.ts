import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar';
import { ProductCardComponent } from './product-card/product-card';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, ProductCardComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      description: 'Premium noise-cancelling wireless headphones',
      price: 199.99,
      imageUrl: 'https://via.placeholder.com/200'
    },
    {
      id: 2,
      name: 'Smart Watch',
      description: 'Fitness tracking smart watch',
      price: 149.99,
      imageUrl: 'https://via.placeholder.com/200'
    },
    {
      id: 3,
      name: 'Bluetooth Speaker',
      description: 'Portable high-quality bluetooth speaker',
      price: 89.99,
      imageUrl: 'https://via.placeholder.com/200'
    },
    {
      id: 4,
      name: 'Laptop Stand',
      description: 'Ergonomic aluminum laptop stand for laptops',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/200'
    },
    {
      id: 5,
      name: 'Wireless Mouse',
      description: 'Rechargeable wireless mouse with smooth tracking',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/200'
    },
    {
      id: 6,
      name: 'Mechanical Keyboard',
      description: 'RGB mechanical keyboard for fast typing',
      price: 99.99,
      imageUrl: 'https://via.placeholder.com/200'
    }
  ];
  

  filteredProducts: Product[] = [...this.products];
  cart: Product[] = [];

  onSearch(query: string) {
    this.filteredProducts = this.products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  onProductSelected(product: Product) {
    if (!this.cart.find(p => p.id === product.id)) {
      this.cart.push(product);
    }
  }

  isSelected(product: Product): boolean {
  return this.cart.some(p => p.id === product.id);
}

}
