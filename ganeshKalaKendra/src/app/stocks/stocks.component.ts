import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { NewProductPopupComponent } from '../new-product-popup/new-product-popup.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, PageEvent, MatSnackBar } from '@angular/material';
import { UtilsService } from '../utils.service';
import { NotificationComponent } from '../sales/sales.component';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  public products: any[] = [];
  public pageSize: number;
  public pageSizeOptions: any[] = [5, 10, 25, 100];
  public startIndex: number;
  public endIndex: number;
  constructor(private dialog: MatDialog, private utilService: UtilsService,
    private snackBar: MatSnackBar, private router: Router) { }

  pageEvent: PageEvent;

  ngOnInit() {
    if (localStorage.userType === 'user') {
      if (this.utilService.getLoginStatus()) {
        this.router.navigate(['/home/sales']);
      } else {
        this.router.navigate(['/login']);
      }
    }

    this.utilService.getProducts()
      .subscribe(products => {
        this.products = products;
        this.pageSize = 10;
        this.startIndex = 0;
        this.endIndex = this.startIndex + this.pageSize;
        this.pageEvent = new PageEvent();
        this.pageEvent.pageSize = this.pageSize;
      });
  }

  onChange(pageEvent) {
    this.pageEvent = pageEvent;
    this.startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    this.endIndex = this.startIndex + pageEvent.pageSize;
  }

  openPopup(data): any {
    return this.dialog.open(NewProductPopupComponent, {
      width: '500px',
      height: '300px',
      data: data
    });
  }

  addProduct() {
    const data = {
      name: '',
      quantity: '',
      rate: ''
    };

    this.openPopup(data).afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.utilService.addProduct(result)
          .subscribe(response => {
            if (response.status === 200) {
              this.utilService.notifyMsg = 'Product added successfully';
              // this.utilService.notifyMsg = JSON.parse(response._body).msg;
              this.openSnackBar();
              this.products.unshift(JSON.parse(response['_body']));
            }
          });
      }
    });
  }

  deleteProduct(index): void {
    const dialogRef = this.dialog.open(DeleteProductDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.utilService.deleteProduct(this.products[index]._id)
          .subscribe(response => {
            if (response.status === 200) {
              this.utilService.notifyMsg = 'Product deleted successfully';
              this.openSnackBar();
              this.products.splice(index, 1);
            }
          });
      }
    });
  }

  editProduct(index) {
    const editModeProduct = Object.assign({}, this.products[index]);
    this.openPopup(editModeProduct).afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.utilService.updateProduct(editModeProduct._id, result)
          .subscribe(response => {
            this.utilService.notifyMsg = 'Product updated successfully';
            this.openSnackBar();
            this.products[index] = result;
          });
      }
    });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 1000,
    });
  }

}


@Component({
  selector: 'app-delete-product-dialog',
  templateUrl: 'delete-product-dialog.component.html',
})
export class DeleteProductDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
