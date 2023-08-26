import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './customer.interface';
import { shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  
  getCustomer$ = this.http.get<Customer[]>('api/customer')
  .pipe(
    shareReplay(1),
  );
  
  constructor(private http: HttpClient) { }
}
