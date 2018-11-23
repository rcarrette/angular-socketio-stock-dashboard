import { Component, OnInit } from '@angular/core'

import { Stock } from '../../models/stock'
import { Price } from '../../models/price'

import { StockService } from '../../services/stock.service'

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  private stocks: Stock[] = []
  private selectedStock: Stock

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.init()

    this.stockService.subscribeToStocks('googl,msft,aapl,amzn,fb,tsla')

    this.stockService.onStockUpdate().subscribe((stock: Stock) => {
      this.onStockUpdate(stock)
    })
  }

  onStockUpdate(stock: Stock): void {
    //TODO css animation card flash in the template w/ binding

    if (this.stocks.length == 0 || this.stocks.filter(s => s.symbol == stock.symbol).length == 0) {
      this.stocks.push(stock)
    }
    else {
      let existingStock: Stock = this.stocks.filter(s => s.symbol == stock.symbol)[0]

      if (existingStock.currentPrice != stock.currentPrice) {
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