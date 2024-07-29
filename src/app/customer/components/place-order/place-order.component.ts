import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrl: './place-order.component.scss'
})
export class PlaceOrderComponent {

  orderForm!: FormGroup;

  constructor(private fb:FormBuilder,
    private snackbar:MatSnackBar,
    private customerService:CustomerService,
    private router:Router,
    public dialog:MatDialog
  ){}

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      address: [null, [Validators.required]],
      orderDescription: [null],
    })
  }

  placeOrder(){
    this.customerService.placeOrder(this.orderForm.value).subscribe(res =>{
      if(res.id != null){
        this.snackbar.open("Order placed successfully", "Close", {duration:5000})
        this.router.navigateByUrl("/customer/my-orders");
      }else{
        this.snackbar.open("Something went wrong", "Close", {duration:5000})
      }
    })
  }

}
