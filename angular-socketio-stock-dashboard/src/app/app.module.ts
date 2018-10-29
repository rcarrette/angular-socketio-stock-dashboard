import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatCardModule } from '@angular/material/card'

import { AppComponent } from './components/app.component'
import { HeadlineComponent } from './components/headline/headline.component'
import { StockListComponent } from './components/stock-list/stock-list.component';
import { StockComponent } from './components/stock/stock.component'

@NgModule({
  declarations: [
    AppComponent,
    HeadlineComponent,
    StockListComponent,
    StockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
