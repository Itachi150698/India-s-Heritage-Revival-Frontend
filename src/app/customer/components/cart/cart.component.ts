import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PlaceOrderComponent } from '../place-order/place-order.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  order: any;

  couponForm!:FormGroup;

  constructor(
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.couponForm = this.fb.group({
      code: [null, [Validators.required]]
    })
    this.getCart();
  }


  applyCoupon(){
    this.customerService.applyCoupon(this.couponForm.get(['code'])!.value).subscribe(res =>{
      this.snackBar.open("Coupon Applied Successfully", "Close", {
        duration:5000
      });
      this.getCart();
    }, error =>{
      this.snackBar.open(error.error, 'Close',{
        duration:5000
      });
    })
  }

  getCart() {
    this.cartItems = [];
    this.customerService.getCartByUserId().subscribe(
      res => {
        this.order = res;
        if (res.cartItems && Array.isArray(res.cartItems)) {
          res.cartItems.forEach(element => {
            element.processedImg = 'data:image/jpeg;base64,' + element.returnedImg;
            this.cartItems.push(element);
          });
        } else {
          console.error('cartItems is undefined or not an array');
        }
      },
      error => {
        console.error('Error fetching cart items', error);
      }
    );
  }

  increaseQuantity(productId:any){
    this.customerService.increaseProductQuantity(productId).subscribe(res =>{
      this.snackBar.open('Product quantity increased', 'Close', {duration:5000});
      this.getCart();
    })
  }

  decreaseQuantity(productId:any){
    this.customerService.decreaseProductQuantity(productId).subscribe(res =>{
      this.snackBar.open('Product quantity decreased', 'Close', {duration:5000});
      this.getCart();
    })
  }

  removeFromCart(productId: any) {
  this.customerService.removeProductFromCart(productId).subscribe(
    res => {
      this.snackBar.open('Product removed from cart', 'Close', { duration: 5000 });
      this.getCart(); // Refresh the cart after the product is removed
    },
    error => {
      this.snackBar.open('Error removing product from cart', 'Close', { duration: 5000 });
    }
  );
}

  placeOrder(){
    this.dialog.open(PlaceOrderComponent)
  }
}
