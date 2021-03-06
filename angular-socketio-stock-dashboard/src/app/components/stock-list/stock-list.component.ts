import { Component, OnInit } from '@angular/core'

import { Stock } from '../../models/stock'
import { Price } from '../../models/price'

import { StockService } from '../../services/stock.service'
import { Router } from '@angular/router'

import { Globals } from 'src/app/globals'

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  private stocks: Stock[] = []
  private selectedStock: Stock

  constructor(private stockService: StockService, private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.stockService.init()

    this.stockService.subscribeToStocks(this.globals.stockSymbols.join(','))

    this.stockService.onStockUpdate().subscribe((stock: Stock) => this.onStockUpdate(stock))
  }

  onStockUpdate(stock: Stock): void {
    //TODO css animation card flash in the template w/ binding
    //TODO + browser notification only when Nasdaq opens

    if (this.stocks.length == 0 || this.stocks.filter(s => s.symbol == stock.symbol).length == 0) {
      this.stocks.push(stock)
    }
    else {
      let existingStock: Stock = this.stocks.filter(s => s.symbol == stock.symbol)[0]

      if (existingStock.currentPrice.value != stock.currentPrice.value) {
        existingStock.currentPrice = stock.currentPrice

        existingStock.pricesHistory.push(<Price>({
          value: stock.currentPrice.value,
          date: stock.lastUpdated
        }))
      }
      
      existingStock.lastUpdated = stock.lastUpdated
    }
  }

  onStockSelected(stock: Stock): void {
    this.selectedStock = stock
  }
}