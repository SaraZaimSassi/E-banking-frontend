import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit{
  customers! : Observable<Array<Customer>>;
  errorMessage! : string ;
  searchformGroup : FormGroup | undefined;

  constructor(private customerService : CustomerService, private fb : FormBuilder, private router : Router) {}
  ngOnInit() {
    this .searchformGroup=this.fb.group({
      Keyword : this.fb.control("")
    });
    this.handleSearchCustomers();


  }

  handleSearchCustomers() {
    let Kw=this.searchformGroup?.value.Keyword;
    this.customers=this.customerService.searchCostomers(Kw).pipe(
      catchError(err=>{
        this.errorMessage=err.message;
        return throwError(err);
      })
    );

  }

  handleDeleteCustomer(c: Customer) {
    let conf = confirm('Are you sure!');
    if(!conf) return;
    this.customerService.deleteCostomer(c.id).subscribe({
      next : (resp)=>{
        this.customers=this.customers.pipe(
          map(data=>{
            let index=data.indexOf(c);
            data.slice(index,1)
            return data;
          })
        );
      },
      error : err =>{
        console.log(err);
      }
    })


  }

  handleCustomerAccounts(customer: Customer) {
    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state :customer});
  }
}
