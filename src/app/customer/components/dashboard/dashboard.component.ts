import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  products: any[] = [];
  searchProductForm!: FormGroup;

  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.searchProductForm = this.fb.group({
      title: [null, [Validators.required]]
    })
  }

  getAllProducts() {
    this.products = [];
    this.customerService.getAllProducts().subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

  submitForm(){
    this.products = [];
    const title = this.searchProductForm.get('title')!.value;
    this.customerService.getAllProductByName(title).subscribe(res => {
      res.forEach(element => {
        element.processedImg = 'data:image/jpeg;base64,' + element.byteImg;
        this.products.push(element);
      });
      console.log(this.products)
    })
  }

addToCart(id: any) {
  this.customerService.addProductToCart(id).subscribe({
    next: (res) => {
      this.snackbar.open("Product added to cart successfully", "Close", {
        duration: 5000
      });
    },
    error: (err) => {
      console.error("Error adding product to cart", err);
      this.snackbar.open("Failed to add product to cart", "Close", {
        duration: 5000
      });
    }
  });
}


  viewProductDetail(productId: number): void {
    this.router.navigate(['/customer/product', productId]);
  }
}
