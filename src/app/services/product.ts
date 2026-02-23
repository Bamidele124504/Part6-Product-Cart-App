import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler';


export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {

  private apiUrl = 'http://localhost:3000/products';

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl)
    .pipe(catchError(this.errorHandler.handleError));
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
    .pipe(catchError(this.errorHandler.handleError));
  }

  createProduct(product: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product)
    .pipe(catchError(this.errorHandler.handleError));
  }
}
