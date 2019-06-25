import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/operator/map';
const  baseUrl = "https://apidev.penq.ir:1404/";
@Injectable()
export class LoginService {

  constructor(private http: HttpClient) { }

  login(data) {
    data = { user: 'admin', password: 'admin' };
    return this.http.post('https://localhost:3070/api/login', data);
  }

  getCustomerDetails() {
    return this.http.get('http://localhost:3070/customers/details');
  }

  getToken(){
    const data = {emailOrPhoneNo:"admin@penq.ir", password: "321456"
    };
    return this.http.post(baseUrl+"api/Token/GetToken",data);
  }

}
