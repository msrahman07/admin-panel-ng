import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Employee } from './employee';
import { map, shareReplay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService implements OnInit{
  headers: HttpHeaders = new HttpHeaders()
  .set('app-id','64e73706a4ae9c4d4bca04c1');

  getEmployees$ = this.http.get<any>('https://dummyapi.io/data/v1/user', {'headers':this.headers})
  .pipe(
    map(response => response['data']),
    shareReplay(1),
  );

  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  getEmployees() {
    return this.http.get<any>('https://dummyapi.io/data/v1/user', {'headers':this.headers})
    .pipe(
      map(response => response['data']),
      shareReplay(1),
    );
  }
}
