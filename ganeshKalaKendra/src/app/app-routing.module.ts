import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SalesComponent } from './sales/sales.component';
import { StocksComponent } from './stocks/stocks.component';
import {WholesaleOrdersComponent} from './wholesale-orders/wholesale-orders.component';
import { RetailOrdersComponent } from './retail-orders/retail-orders.component';

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent,
        children: [
            { path: '', redirectTo: 'sales', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'sales', component: SalesComponent },
            { path: 'stocks', component: StocksComponent },
            { path: 'wholesale-orders', component: WholesaleOrdersComponent },
            { path: 'retail-orders', component: RetailOrdersComponent },
            { path: '**', redirectTo: 'sales' }
        ]
    },
    { path: '**', component: LoginComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [LoginComponent, HomeComponent, DashboardComponent, SalesComponent,
    StocksComponent];
