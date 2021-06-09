import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Customer, Product, Bill } from './models/model';
import { Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class UtilsService {

  public notifyMsg: String = '';
  public isLogin: Boolean = false;
  public loginFlagChange: Observable<any>;
  public loginObserver;
  public billID = '';

  constructor(private _http: Http) {
    this.loginFlagChange = new Observable((observer: Observer<any>) => {
      this.loginObserver = observer;
    });
  }

  getBillNo(custType) {
    return this._http.get('http://localhost:3000/api/getBillNo/' + custType)
      .pipe(map(res => res.json()));
  }

  setBillNo(data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/updateBillNo/' + this.billID, data, { headers: headers });
  }

  setLoginStatus(status: Boolean) {
    this.isLogin = status;
    this.loginObserver.next(this.isLogin);
    sessionStorage.setItem('login', status.toString());
  }

  getLoginStatus(): Boolean {
    return sessionStorage.getItem('login') === 'true';
  }

  // retriving customer details
  getCustomers() {
    return this._http.get('http://localhost:3000/api/customers')
      .pipe(map(res => res.json()));
  }

  // add customer details
  addCustomer(data: Customer) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/customer', data, { headers: headers });
  }

  // delete customer
  deleteCustomer(id) {
    return this._http.delete('http://localhost:3000/api/customer/' + id)
      .pipe(map(res => res.json()));
  }

  // retriving product details
  getProducts() {
    return this._http.get('http://localhost:3000/api/products')
      .pipe(map(res => res.json()));
  }

  // add product details
  addProduct(data: Product) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/product', data, { headers: headers });
  }

  // delete product
  deleteProduct(id) {
    return this._http.delete('http://localhost:3000/api/product/' + id)
      .pipe(map(res => res.json()));
  }

  // delete product
  updateProduct(id, data) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/product/' + id, data, { headers: headers })
      .pipe(map(res => res.json()));
  }

  // save printed bill
  saveBill(data: Bill) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://localhost:3000/api/saveBill', data, { headers: headers });
  }

  deleteBill(id) {
    return this._http.delete('http://localhost:3000/api/deleteBill/' + id)
      .pipe(map(res => res.json()));
  }


  // get wholesale customer data
  getWholesaleBills() {
    return this._http.get('http://localhost:3000/api/getWholesaleBills')
      .pipe(map(res => res.json()));
  }

  // get Retail customer data
  getRetailBills() {
    return this._http.get('http://localhost:3000/api/getRetailBills')
      .pipe(map(res => res.json()));
  }


  getYearsArr(startYear?) {
    const currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 2017;

    while (startYear <= currentYear) {
      years.push(startYear++);
    }

    return years;
  }

}
