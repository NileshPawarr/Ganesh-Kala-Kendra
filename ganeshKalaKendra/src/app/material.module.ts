import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatCardModule, MatInputModule, MatTabsModule, MatRadioModule, MatIconModule,
    MatAutocompleteModule, MatSelectModule, MatDialogModule, MatPaginatorModule, MatSnackBarModule, MatCheckboxModule, MatDatepickerModule
} from '@angular/material';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatTabsModule, MatRadioModule,
        MatIconModule, MatAutocompleteModule, MatSelectModule, MatDialogModule,
        MatPaginatorModule, MatSnackBarModule, MatCheckboxModule, MatDatepickerModule],
    exports: [CommonModule, MatButtonModule, MatCardModule, MatInputModule, MatTabsModule, MatRadioModule,
        MatAutocompleteModule, MatIconModule, MatSelectModule, MatDialogModule,
        MatPaginatorModule, MatSnackBarModule, MatCheckboxModule, MatDatepickerModule]
})
export class CustomMaterialModule { }
