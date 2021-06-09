import { Component, OnInit } from '@angular/core';
import { PageEvent, MatDialog, MatSnackBar } from '@angular/material';
import { UtilsService } from '../utils.service';
import { Bill } from '../models/model';
import { DeleteReceiptDialogComponent } from '../delete-reciept/delete-reciept.component';
import { NotificationComponent } from '../sales/sales.component';

@Component({
  selector: 'app-retail-orders',
  templateUrl: './retail-orders.component.html',
  styleUrls: ['./retail-orders.component.scss']
})
export class RetailOrdersComponent implements OnInit {
  public retailBillsArr: Bill[] = [];
  public pageSize: number;
  public pageSizeOptions: any[] = [2, 5, 10, 25, 100];
  public startIndex: number;
  public endIndex: number;
  public productArr: String[];
  public selectedProductName = '';
  public selectedMonth = '';
  public monthArr = [
    {
      month: 'January',
      value: '01'
    },
    {
      month: 'February',
      value: '02'
    },
    {
      month: 'March',
      value: '03'
    },
    {
      month: 'April',
      value: '04'
    },
    {
      month: 'May',
      value: '05'
    },
    {
      month: 'June',
      value: '06'
    },
    {
      month: 'July',
      value: '07'
    },
    {
      month: 'August',
      value: '08'
    },
    {
      month: 'September',
      value: '09'
    },
    {
      month: 'October',
      value: '10'
    },
    {
      month: 'November',
      value: '11'
    },
    {
      month: 'December',
      value: '12'
    }
  ];
  public selectedYear = '';
  public yearArr = [];

  constructor(private dialog: MatDialog, private utilsService: UtilsService, private snackBar: MatSnackBar) { }

  pageEvent: PageEvent;
  total: number;


  ngOnInit() {
    this.utilsService.getRetailBills()
      .subscribe(response => {
        this.retailBillsArr = response;
        this.pageSize = 10;
        this.startIndex = 0;
        this.endIndex = this.startIndex + this.pageSize;
        this.pageEvent = new PageEvent();
        this.pageEvent.pageSize = this.pageSize;
        this.productArr = Array.from(new Set(this.retailBillsArr.map(a => a.products[0])));
        this.populateMonthAndYear();
      });
    this.yearArr = this.utilsService.getYearsArr();
    this.selectedYear = new Date().getFullYear().toString();
  }

  populateMonthAndYear() {
    const monthArr = [],
      yearArr = [];
    this.retailBillsArr.forEach(function (bill, index) {
      const dateStr = bill.createdDate;
      if (dateStr !== null && dateStr !== '') {
        bill.month = dateStr.substring(3, 5);
        bill.year = dateStr.substring(6);
      }
    });
  }

  onChange(pageEvent) {
    this.pageEvent = pageEvent;
    this.startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    this.endIndex = this.startIndex + pageEvent.pageSize;
  }

  printBill(billHtml) {
    const popupWin = window.open('', '_blank', 'top=0,left=0,width=' + screen.availWidth + ',height=' + screen.availHeight);
    popupWin.document.open();

    popupWin.document.write(billHtml);
    popupWin.document.close();
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 1000,
    });
  }

  deleteBill(id): void {
    const dialogRef = this.dialog.open(DeleteReceiptDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.utilsService.deleteBill(id)
          .subscribe((response) => {
            if (response.status === 200) {
              this.utilsService.notifyMsg = 'Bill deleted successfully';
              this.openSnackBar();
              this.retailBillsArr.splice(this.retailBillsArr.findIndex(bill => bill._id === id), 1);
              this.retailBillsArr = this.retailBillsArr.map(val => val);
            }
          });
      }
    });
  }
}
