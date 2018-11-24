import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule, MatButton } from '@angular/material/button'

import { ChartModule } from 'angular-highcharts'

import { AppComponent } from './components/app.component'
import { HeadlineComponent } from './components/headline/headline.component'
import { StockListComponent } from './components/stock-list/stock-list.component'
import { StockDetailsComponent } from './components/stock-details/stock-details.component'
import { CompanyDetailsComponent } from './components/company-details/company-details.component'

@NgModule({
  declarations: [
    AppComponent,
    HeadlineComponent,
    StockListComponent,
    StockDetailsComponent,
    CompanyDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    ChartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
