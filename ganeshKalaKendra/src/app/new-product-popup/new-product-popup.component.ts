import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new-product-popup',
  templateUrl: './new-product-popup.component.html',
  styleUrls: ['./new-product-popup.component.scss']
})
export class NewProductPopupComponent implements OnInit {

  public product = {};
  public disable = true;

  constructor(
    public dialogRef: MatDialogRef<NewProductPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.checkInputs();
  }

  checkInputs() {
    if (this.data.name !== ''  && this.data.rate !== '') {
      this.disable = false;
    } else {
      this.disable = true;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}



