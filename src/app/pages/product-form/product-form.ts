import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { StateService } from '../../services/state';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css'
})
export class ProductFormComponent implements OnInit {

  loading$!: Observable<boolean>;
  error$!: Observable<string | null>;

  form: any;

  constructor(
    private fb: FormBuilder,
    private service: ProductService,
    private state: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // Assign observables AFTER injection
    this.loading$ = this.state.loading$;
    this.error$ = this.state.error$;

    // Create form AFTER injection
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(50)]],
      category: ['', Validators.required],
      imageUrl: ['', [Validators.required, Validators.pattern('https?://.+')]],
      inStock: [true],
      rating: [0, [Validators.min(0), Validators.max(5)]],
      properties: this.fb.array([this.createProperty()])
    });
  }

  get properties(): FormArray {
    return this.form.get('properties') as FormArray;
  }

  createProperty() {
    return this.fb.group({
      color: ['', Validators.required],
      weight: ['', Validators.required]
    });
  }

  addProperty() {
    this.properties.push(this.createProperty());
  }

  removeProperty(i: number) {
    if (this.properties.length > 1) {
      this.properties.removeAt(i);
    }
  }

  submit() {

    if (this.form.invalid) return;

    this.state.setLoading(true);
    this.state.setError(null);

    this.service.createProduct(this.form.value).subscribe({
      next: (newProduct) => {

        const currentProducts = this.state['snapshot'].products;

        this.state.setProducts([...currentProducts, newProduct]);

        this.state.setLoading(false);

        this.form.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.state.setError(err);
        this.state.setLoading(false);
      }
    });
  }
}
