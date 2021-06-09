import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UtilsService } from '../utils.service';
import { Customer, Product, Bill, BillNo } from '../models/model';
import { NewCustomerPopupComponent, ErrorPopupComponent } from '../new-customer-popup/new-customer-popup.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { identifierModuleUrl } from '@angular/compiler';
import { NewProductPopupComponent } from '../new-product-popup/new-product-popup.component';

declare var $: any;

@Component({
  selector: 'app-notification',
  template: '<div class="notification-msg">{{notifyMsg}}</div>'
})
export class NotificationComponent implements OnInit {
  constructor(private utilsService: UtilsService) { }
  public notifyMsg: String = '';
  ngOnInit() {
    this.notifyMsg = this.utilsService.notifyMsg;
  }
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesComponent implements OnInit {

  salesForm: FormGroup;
  productsArr: FormArray;

  public custNameControl: FormControl = new FormControl();

  public date: string;
  public billNo: number;
  public options: Customer[] = [];
  public products: Product[] = [];
  public prefixArr = ['Mr.', 'Mrs.', 'Ms.'];
  public feetArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public inchArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  public colorArr = ['लाल', 'पिवळा', 'हिरवा', 'पिस्ता', 'मोरपिशी', 'वांगी',
    'राणि', 'लेमन येल्लो', 'गुलाबी', 'पांढरा', 'निळा', 'जांभळा', 'पोपटी', 'ऑरेंज ', 'मरून', 'सोनेरी', 'चंदेरी'];
  public isWholesaleCust = false;
  public selectedProducts: Product[] = [];
  public billData: Bill;

  public totalAmt = 0;
  public advanceAmt = 0;
  public remAmt = 0;
  public paymentType: String = 'Cash';
  public currentProductIndex = 0;
  public invalidTotal = false;

  filteredOptions: Customer[];
  filteredProducts: Observable<Product[]>;

  constructor(private _fb: FormBuilder, private utilsService: UtilsService,
    private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    $('#currentDate').datepicker({
      // showOn: 'button',
      // buttonText: 'Show Date',
      // buttonImageOnly: true,
      // buttonImage: 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',
      dateFormat: 'dd/mm/yy'
      // constrainInput: true
    });

    $('#deliveryDate').datepicker({
      // showOn: 'button',
      // buttonText: 'Show Date',
      // buttonImageOnly: true,
      // buttonImage: 'http://jqueryui.com/resources/demos/datepicker/images/calendar.gif',
      dateFormat: 'dd/mm/yy'
      // constrainInput: true
    });

    this.productsArr = new FormArray([]);

    this.getBillNo();

    this.utilsService.getCustomers()
      .subscribe(customers => {
        this.options = customers;
        this.filteredOptions = this.customerfilter();
        // this.salesForm.controls['customerDetails'].get('name').valueChanges
        //   .pipe(
        //     startWith(''),
        //     map(val => this.customerfilter(val, null))
        //   );
      });

    this.utilsService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.filteredProducts = this.salesForm.get('productsArr').valueChanges
          .pipe(
            startWith(''),
            map(val => this.productFilter(val)));
      });

    this.populateDate();
    this.initializeForm();
  }

  getBillNo() {
    this.utilsService.getBillNo(this.isWholesaleCust ? 'Wholesale' : 'Retail')
      .subscribe(response => {
        this.billNo = parseInt(response[0].billNo, 10);
        this.salesForm.controls['billNo'].setValue(this.billNo);
        this.utilsService.billID = response[0]._id;
      });
  }

  initializeForm() {
    this.salesForm = this._fb.group({
      isWholesaleCust: this.isWholesaleCust,
      currentDate: this.date,
      deliveryDate: '',
      billNo: this.billNo,
      customerDetails: this._fb.group({
        selectedValue: 'Mr.',
        name: new FormControl('', Validators.required),
        address: '',
        phone: ''
      }),
      productsArr: this._fb.array([this.initProducts()]), // here,
      paymentType: 'Cash',
      totalAmt: 0,
      advanceAmt: 0,
      remAmt: 0,
      feet: 1,
      inches: 1,
      dhotiColor: '',
      shawlColor: '',
      feature1: '',
      feature2: ''
    });
    this.selectedProducts = [];
    this.filteredProducts = this.salesForm.get('productsArr').valueChanges
      .pipe(
        startWith(''),
        map(val => this.productFilter(val)));
  }

  changeBillFormat() {
    this.initializeForm();
    this.getBillNo();
  }

  onProductFocus(event, index) {
    this.currentProductIndex = index;
  }

  initProducts() {
    return this._fb.group({
      // list all your form controls here, which belongs to your form array
      pName: '',
      quantity: 1,
      rate: 0,
      price: 0
    });
  }

  populateDate(): void {
    const today = new Date(),
      todayDate = today.getDate(),
      todayMonth = today.getMonth() + 1,
      yyyy = today.getFullYear();
    let dd = todayDate.toString(),
      mm = todayMonth.toString();

    if (todayDate < 10) {
      dd = '0' + todayDate;
    }
    if (todayMonth < 10) {
      mm = '0' + todayMonth;
    }
    this.date = dd + '/' + mm + '/' + yyyy;
  }

  openPopup(data): any {
    return this.dialog.open(NewCustomerPopupComponent, {
      width: '400px',
      height: '370px',
      data: data
    });
  }

  openProductPopup(data): any {
    return this.dialog.open(NewProductPopupComponent, {
      width: '300px',
      height: '290px',
      data: data
    });
  }

  onCustomerSelect(option: Customer) {
    if (option._id === null) {
      this.salesForm.controls['customerDetails'].get('name').setValue('');
      const data = {
        name: '',
        address: '',
        phone: ''
      };
      this.openPopup(data).afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.utilsService.addCustomer(result).subscribe(customers => {
            this.utilsService.notifyMsg = 'Customer added successfully';
            this.openSnackBar();
            this.options.push(result);
            // this.custNameControl.setValue(result.name);
            /*  this.customerDetails.phone = result.phone;
             this.customerDetails.address = result.address; */

            this.salesForm.controls['customerDetails'].get('name').setValue(result.name);
            this.salesForm.controls['customerDetails'].get('phone').setValue(result.phone);
            this.salesForm.controls['customerDetails'].get('address').setValue(result.address);
          });
        }
      });
    } else {
      /* this.customerDetails.phone = option.phone;
      this.customerDetails.address = option.address; */

      this.salesForm.controls['customerDetails'].get('phone').setValue(option.phone);
      this.salesForm.controls['customerDetails'].get('address').setValue(option.address);
    }
  }

  onProductSelect(option: Product, index: number, event: Event) {
    const quantity = 1;
    if (option._id === null) {
      this.salesForm.get('productsArr')['controls'][index].controls['pName'].setValue('');
      const data = {
        name: '',
        quantity: '',
        rate: ''
      };
      this.openProductPopup(data).afterClosed().subscribe(result => {
        if (result !== undefined) {
          this.utilsService.addProduct(result).subscribe(products => {
            this.utilsService.notifyMsg = 'Product added successfully';
            this.openSnackBar();
            // const resultProd = new Product();
            // resultProd.name = result.name;
            // resultProd.quantity = 1;
            // resultProd.rate = result.rate;
            // this.selectedProducts.push(resultProd);
            const prodCtrl = this.salesForm.get('productsArr')['controls'][index];
            prodCtrl.controls['pName'].setValue('');



            prodCtrl.controls['quantity'].setValue(quantity);
            prodCtrl.controls['rate'].setValue(option.rate);
            prodCtrl.controls['price'].setValue(quantity * option.rate);
            this.calculatePrice(index);
          });
        }
      });
    } else {
      const prodCtrl = this.salesForm.get('productsArr')['controls'][index];
      /* let quantity = 1;
      if (this.isWholesaleCust === true) {
        quantity = option.quantity;
      } */

      prodCtrl.controls['quantity'].setValue(quantity);
      prodCtrl.controls['rate'].setValue(option.rate);
      prodCtrl.controls['price'].setValue(quantity * option.rate);

      const resultProd = new Product();
      resultProd.name = option.name;
      resultProd.quantity = 1;
      resultProd.rate = option.rate;
      this.selectedProducts.push(resultProd);
      // this.selectedProducts.push(option);
      this.calculatePrice(index);

    }
  }

  customerfilter(): any[] {
    const val = $('#custName').val(),
      // val = (typeof val === 'undefined') ? event.target.value : val;
      matches = this.options.filter(option =>
        option.name.toLowerCase().includes(val.toLowerCase()));

    if (matches.length === 0 && this.options.length !== 0) {
      matches.push({ '_id': null, 'name': 'No matches were found. Create a new one!' });
    }
    if (event) {
      this.filteredOptions = matches.map(cust => {
        return cust;
      });
    }
    return matches;
  }

  productFilter(val: any): any[] {
    const matches = this.products.filter(option =>
      option.name.toLowerCase().includes(val === '' ? '' : val[this.currentProductIndex].pName.toLowerCase()));
    if (matches.length === 0 && this.products.length !== 0) {
      matches.push({ '_id': null, 'name': 'No matches were found. Create a new one!', 'quantity': 0, 'rate': 0 });
    }
    return matches;
  }

  addProduct(): void {
    // control refers to your formarray
    const control = <FormArray>this.salesForm.controls['productsArr'];
    // add new formgroup
    control.push(this.initProducts());

  }

  removeProduct(index): void {
    if (index > 0) {
      this.selectedProducts.splice(index, 1);
      const control = <FormArray>this.salesForm.controls['productsArr'];
      control.removeAt(index);
      this.calculateFinalPrice();
    }
  }


  calculatePrice(index): void {
    const $product = $('.products-' + index);
    // prodCtrl = this.salesForm.get('productsArr')['controls'][index],
    let quantity = parseInt($product.find('.quantity').val(), 10),
      rate = parseInt($product.find('.rate').val(), 10);
    if (!this.isWholesaleCust) {
      quantity = 1;
      rate = parseInt($product.find('.price').val(), 10);
    }

    if (quantity > 0 && rate > 0) {
      $product.find('.price').val(quantity * rate);
      // this.selectedProducts[index].quantity = quantity;
      // this.selectedProducts[index].price = quantity * rate;
      this.calculateFinalPrice();
    }
  }

  calculateFinalPrice(): void {
    this.totalAmt = 0;
    const prodCtrl = this.salesForm.controls['productsArr'],
      advanceAmt = this.salesForm.get('advanceAmt').value;
    let totalAmt = 0;

    prodCtrl['controls'].forEach(function (val, index) {
      totalAmt += parseInt($($('.products')[index]).find('.price').val(), 10);
    });
    this.totalAmt = totalAmt;
    this.salesForm.get('totalAmt').setValue(totalAmt);
    this.remAmt = this.totalAmt;
    this.salesForm.get('remAmt').setValue(this.remAmt);
    if (advanceAmt > 0) {
      this.deductAdvance();
    }
  }

  deductAdvance(): void {
    const advance = this.salesForm.get('advanceAmt').value;
    this.remAmt = this.salesForm.get('totalAmt').value - advance;
    this.advanceAmt = advance;
    this.salesForm.get('remAmt').setValue(this.remAmt);
    // this.remAmt = (this.totalAmt - this.advanceAmt) < 0 ? 0 : this.totalAmt - this.advanceAmt;
    // this.remAmt = this.totalAmt - this.salesForm.get('advanceAmt').value;
    // this.salesForm.get('remAmt').setValue(this.remAmt);
  }

  checkFinalAmount(): void {
    if (this.remAmt < 0) {
      this.invalidTotal = true;
      this.dialog.open(ErrorPopupComponent, {
        width: '400px',
        height: '200px'
      });
    } else {
      this.invalidTotal = false;
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 1000,
    });
  }

  saveBill(isPrint): void {
    const $printSection = $('#print-section').clone(),
      $item = $printSection.find('.item').detach().clone(),
      formControl = this.salesForm.controls['customerDetails'];

    $printSection.find('.information .bill-no').text(this.salesForm.controls['billNo'].value);
    $printSection.find('.information .current-date').text($('#currentDate').val());
    $printSection.find('.information .delivery-date').text($('#deliveryDate').val());

    $printSection.find('.information .custName').text(formControl.get('name').value);
    $printSection.find('.information .address').text(formControl.get('address').value);
    $printSection.find('.information .phone').text(formControl.get('phone').value);

    if ($('#deliveryDate').val() === '') {
      $printSection.find('.due-date-wrapper').hide();
    }

    $('.products').each((index, val) => {
      const item = $item.clone();

      item.find('.sr-num').text(index + 1);
      item.find('.product').text($(val).find('.pName').val());
      if (this.isWholesaleCust) {
        item.find('.quantity').text($(val).find('.quantity').val());
        item.find('.rate').text($(val).find('.rate').val());

      } else {
        item.find('.quantity').text(1);
        item.find('.rate').text($(val).find('.price').val());
      }
      item.find('.price').text($(val).find('.price').val());
      $printSection.find('.product-list-table').append(item);
    });
    $printSection.find('.costing-table-container .total-value').text(this.totalAmt);
    $printSection.find('.costing-table-container .advance-value').text(this.advanceAmt);
    $printSection.find('.costing-table-container .to-be-paid-value').text(this.remAmt);

    $printSection.find('.payment-wrapper .payment-mode').text(this.salesForm.controls['paymentType'].value);

    if (this.isWholesaleCust) {
      $printSection.find('.wholesale-note').show();
    } else {
      $printSection.find('.customer-note').show();
      $printSection.find('.additional-feature').show();
      $printSection.find('.additional-feature .feet').text(this.salesForm.controls['feet'].value);
      $printSection.find('.additional-feature .inches').text(this.salesForm.controls['inches'].value);
      $printSection.find('.additional-feature .dhotar').text(this.salesForm.controls['dhotiColor'].value);
      $printSection.find('.additional-feature .shawl').text(this.salesForm.controls['shawlColor'].value);

      $printSection.find('.additional-feature .feature1').text(this.salesForm.controls['feature1'].value);
      $printSection.find('.additional-feature .feature2').text(this.salesForm.controls['feature2'].value);
    }

    const printHtml = `
    <html>
    <head>
      <title>Print tab</title>
      <style>
        .invoice-box {
        max-width: 800px;
        margin: auto;
        padding: 30px;
        border: 1px solid #eee;
        box-shadow: 0 0 10px rgba(0, 0, 0, .15);
        font-size: 16px;
        line-height: 24px;
        font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
        color: #555;
        }

        .invoice-box .costing-table-container{
        overflow: auto;
        }

        .invoice-box table {
        width: 100%;
        line-height: inherit;
        text-align: left;
        }

        .invoice-box table td {
        padding: 5px;
        vertical-align: top;
        }

        .invoice-box table tr td:nth-child(1) {
        text-align: left;
        }
        .invoice-box table tr td{
        text-align: right;
        }

        .invoice-box table tr.heading .name,
        .invoice-box table tr.item .product {
          text-align: left;
          }

        .invoice-box table tr.top table td {
        padding-bottom: 20px;
        }

        .invoice-box .header-note {
          text-align: center;
          height: 60px;
        }

        .invoice-box .contact-info {
          position: absolute;
          top: 35px;
          right: 10px;
        }

        .invoice-box table tr.top table .title{
        color: #333;
        text-align: center;
        }
        .invoice-box table tr.top table .title img{
        float: left;
        width: 90px;
        height: 100px;
        }
        .invoice-box table tr.top table .title h2{
          font-size: 35px;
          line-height: 35px;
          position: relative;
          right: 180px;
        }
        .invoice-box table tr.information table td {
        padding-bottom: 40px;
        }

        .invoice-box table tr.top table .header-subtext {
          text-align: center;
        }

        .invoice-box table tr.heading td {
        background-color: #eee;
        border-bottom: 1px solid #ddd;
        font-weight: bold;
        -webkit-print-color-adjust: exact;
        }

        .invoice-box table tr.details td {
        padding-bottom: 20px;
        }

        .invoice-box table tr.item td{
        border-bottom: 1px solid #eee;
        }

        .invoice-box table tr.item.last td {
        border-bottom: none;
        }

        .invoice-box table tr.total td.right {
        text-align: right;
        font-weight: bold;
        }

        .invoice-box .additional-feature {
          /* position: absolute;
          top:10px; */
          font-size: 16px;
        }

        .invoice-box .footer-note {
          margin-top:20px;
          color: black;
        }

        .invoice-box .feature {
          margin: 10px 0px;
        }

        .invoice-box .address-bar td {
          border-top: 2px solid black;
          border-bottom: 2px solid black;
        }

        .invoice-box .address-bar td div{
          text-align: center;
        }
      </style>
    </head>
    <body onload="window.print();window.close()">${$printSection.html()}</body>
  </html>`;
    if (isPrint) {
      const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
      popupWin.document.open();

      popupWin.document.write(printHtml);
      popupWin.document.close();

    }
    this.updateDetailsOnPrint();

    // = Array.from(new Set(this.selectedProducts.map(a => a.name)));
    let products = [];
    $('.products').each((index, val) => {
      products.push($(val).find('.pName').val());
    });
    this.billData = {
      billNo: this.salesForm.controls['billNo'].value,
      name: formControl.get('name').value,
      customerType: this.isWholesaleCust ? 'Wholesale' : 'Retail',
      createdDate: $('#currentDate').val(),
      deliveryDate: $('#deliveryDate').val(),
      billHtml: printHtml,
      products: products,
      mobileNo: formControl.get('phone').value,
      balanceAmt: this.remAmt,
      totalAmt: this.totalAmt
    };

    this.utilsService.saveBill(this.billData).subscribe(res => {
      if (res.status === 200) {
        this.utilsService.notifyMsg = 'Bill saved successfully';
        this.openSnackBar();
      }
    });
  }

  updateDetailsOnPrint() {
    this.selectedProducts.forEach((product, index) => {
      const stockProduct = this.products.find(val => val.name === product.name);

      if (!this.isWholesaleCust) {
        stockProduct.quantity = stockProduct.quantity + 1;
      }

      this.utilsService.updateProduct(stockProduct._id, stockProduct)
        .subscribe(response => {
          if (response.status === 200) {
            const billNo = parseInt(this.salesForm.controls['billNo'].value, 10) + 1;

            this.utilsService.setBillNo({ billNo: billNo, custType: this.isWholesaleCust ? 'Wholesale' : 'Retail' })
              .subscribe(res => {
                if (res.status === 200) {
                  this.billNo = billNo;
                  this.initializeForm();
                }
              });
          }
        });
    });
  }

}
