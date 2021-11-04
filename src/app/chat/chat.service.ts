import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient) { }

  register (username:String): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
    })

const headerDict = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Origin': '*',
}

const requestOptions = {                                                                                                                                                                                 
  headers: new HttpHeaders(headerDict), 
};
console.log(username, 'username');
 var obj : any = {};
 obj.username = username;
 

    return this.http.post<any>("http://localhost:5000/api/user/register",{headers:  new HttpHeaders(headerDict),"name": username});
   //return this.http.get<any>("http://localhost:5000/api/user/register",obj);
  }

  getUser(): Observable<any> {
    return this.http.get<any>("http://localhost:5000/api/user");
  }
}
