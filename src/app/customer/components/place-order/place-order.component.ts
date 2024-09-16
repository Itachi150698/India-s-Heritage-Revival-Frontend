import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserStorageService } from '../../../services/storage/user-storage.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  orderForm!: FormGroup;
  totalAmount: number = 0; // This should be set dynamically

  constructor(
    private fb: FormBuilder,
    private snackbar: MatSnackBar,
    private customerService: CustomerService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null]
    });

    // Fetch the total amount dynamically
    this.fetchTotalAmount();
  }

  fetchTotalAmount() {
    // Replace this with your actual logic to fetch the total amount
    this.customerService.getCartByUserId().subscribe({
      next: (cartData: any) => {
        this.totalAmount = cartData.totalAmount; // Assume the response contains the total amount
      },
      error: (error) => {
        this.snackbar.open('Error fetching cart total amount', 'Close', { duration: 5000 });
        console.error('Error fetching cart total amount:', error);
      }
    });
  }

  placeOrder() {
    if (this.orderForm.invalid) {
      this.snackbar.open('Please fill in all required fields.', 'Close', { duration: 5000 });
      return;
    }

    const orderData = this.orderForm.value;
    orderData.amount = this.totalAmount;
    orderData.userId = UserStorageService.getUserId();

    // Call your backend API to place the order and handle Razorpay payment
    this.customerService.placeOrder(orderData).subscribe({
      next: (response: any) => {
        const options = {
          key: 'rzp_test_7sxZWQXIqUYb4C', // Your Razorpay key
          amount: response.totalAmount, // Amount in paise
          currency: response.currency,
          name: 'Your Company Name',
          description: 'Order Description',
          order_id: response.razorpayOrderId, // Order ID returned by backend
          handler: (paymentResponse: any) => {
            // Payment successful, display a success message
            this.snackbar.open('Order placed successfully', 'Close', { duration: 5000 });
            this.router.navigateByUrl('/customer/my-orders');
            this.closeForm();
          },
          prefill: {
            name: 'Customer Name',
            email: 'customer@example.com',
            contact: '1234567890'
          },
          theme: {
            color: '#3399cc'
          }
        };

        const paymentObject = new (window as any).Razorpay(options);
        paymentObject.open();
      },
      error: (error) => {
        this.snackbar.open('Error placing order', 'Close', { duration: 5000 });
        console.error('Order placement error:', error);
      }
    });
  }

  closeForm() {
    this.dialog.closeAll();
  }
}
