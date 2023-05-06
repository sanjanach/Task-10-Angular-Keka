import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONTACT } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  postContact(data: any){
    return this.http.post<any>("http://localhost:3000/contactList/", data)
  }

  getContact(){
    return this.http.get<any>("http://localhost:3000/contactList")
  }

  removeContact(){
    return this.http.delete<any>("http://localhost:3000/contactList")
  }
}
