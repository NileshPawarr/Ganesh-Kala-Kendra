import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
    selector: 'app-delete-bill-dialog',
    template: `
        <h1 mat-dialog-title>Delete Receipt!</h1>
        <div mat-dialog-content>
        <p>Are you sure you want to delete this receipt?</p>
        </div>
        <div mat-dialog-actions>
        <button mat-raised-button color="primary" [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
        <button mat-raised-button (click)="onNoClick()">No</button>
        </div>
    `,
})
export class DeleteReceiptDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<DeleteReceiptDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}
