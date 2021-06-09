import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-customer-popup',
  templateUrl: './new-customer-popup.component.html',
  styleUrls: ['./new-customer-popup.component.scss']
})
export class NewCustomerPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<NewCustomerPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }



  onCancel(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./new-customer-popup.component.scss']
})
export class ErrorPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ErrorPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
