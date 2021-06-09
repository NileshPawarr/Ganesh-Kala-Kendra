import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from './material.module';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NewProductPopupComponent } from './new-product-popup/new-product-popup.component';
import { UtilsService } from './utils.service';
import { NewCustomerPopupComponent, ErrorPopupComponent } from './new-customer-popup/new-customer-popup.component';
import { NotificationComponent } from './sales/sales.component';
import { DeleteProductDialogComponent } from './stocks/stocks.component';
import { DeleteReceiptDialogComponent } from './delete-reciept/delete-reciept.component';
import { WholesaleOrdersComponent } from './wholesale-orders/wholesale-orders.component';
import { FilterPipe, ProductFilterPipe, MonthFilterPipe, YearFilterPipe } from './filters/filters.pipe';
import { RetailOrdersComponent } from './retail-orders/retail-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    routingComponents,
    NewProductPopupComponent,
    NewCustomerPopupComponent,
    NotificationComponent,
    DeleteProductDialogComponent,
    DeleteReceiptDialogComponent,
    ErrorPopupComponent,
    WholesaleOrdersComponent,
    FilterPipe, ProductFilterPipe,
    MonthFilterPipe, YearFilterPipe,
    RetailOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CustomMaterialModule,
    HttpModule
  ],
  providers: [UtilsService],
  entryComponents: [NewProductPopupComponent, NewCustomerPopupComponent, NotificationComponent,
    DeleteProductDialogComponent, DeleteReceiptDialogComponent, ErrorPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
