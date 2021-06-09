import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../utils.service';
import { Bill } from '../models/model';
import { PageEvent, MatDialog, MatSnackBar } from '@angular/material';
import { DeleteReceiptDialogComponent } from '../delete-reciept/delete-reciept.component';
import { NotificationComponent } from '../sales/sales.component';

@Component({
  selector: 'app-wholesale-orders',
  templateUrl: './wholesale-orders.component.html',
  styleUrls: ['./wholesale-orders.component.scss']
})
export class WholesaleOrdersComponent implements OnInit {
  public wholesaleBillsArr: Bill[] = [];
  public pageSize: number;
  public pageSizeOptions: any[] = [2, 5, 10, 25, 100];
  public startIndex: number;
  public endIndex: number;
  public custNameArr: string[];
  public selectedCustName = '';
  public selectedMonth = '';
  public selectedYear = '';
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
  public yearArr = [];

  constructor(private dialog: MatDialog, private utilsService: UtilsService,
    private snackBar: MatSnackBar) { }

  pageEvent: PageEvent;

  ngOnInit() {
    this.utilsService.getWholesaleBills()
      .subscribe(response => {
        this.wholesaleBillsArr = response;
        this.pageSize = 10;
        this.startIndex = 0;
        this.endIndex = this.startIndex + this.pageSize;
        this.pageEvent = new PageEvent();
        this.pageEvent.pageSize = this.pageSize;
        this.custNameArr = Array.from(new Set(this.wholesaleBillsArr.map(a => a.name)));
        this.populateMonthAndYear();
      });
    this.yearArr = this.utilsService.getYearsArr();
    this.selectedYear = new Date().getFullYear().toString();
  }


  populateMonthAndYear() {
    const monthArr = [],
      yearArr = [];
    this.wholesaleBillsArr.forEach(function (bill, index) {
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
              this.wholesaleBillsArr.splice(this.wholesaleBillsArr.findIndex(bill => bill._id === id), 1);
              this.wholesaleBillsArr = this.wholesaleBillsArr.map(val => val);
            }
          });
      }
    });
  }

}
