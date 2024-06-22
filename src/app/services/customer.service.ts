import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/customer.model";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendHost:string="http://localhost:8089";
  constructor(private http:HttpClient) { }

  public getCostomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers")
  }
  public searchCostomers(Keyword : string ):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(this.backendHost+"/customers/search?Keyword="+Keyword)
  }
  public saveCostomer(customer : Customer):Observable<Customer>{
    return this.http.post<Customer>(this.backendHost+"/customers",customer);
  }
  public deleteCostomer(id : number){
    return this.http.delete(this.backendHost+"/customers/"+id);
  }
}
