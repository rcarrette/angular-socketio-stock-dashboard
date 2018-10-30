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

    this.stockService.onStockUpdate().subscribe((data: string) => {
      this.onStockUpdate(data)
    })
  }

  onStockUpdate(data: string): void {
    //TODO css animation card flash in the template w/ binding

    // console.log(`stock udpate received: ${data}`)

    let stockPayload: any = JSON.parse(data)

    let lastUpdatedDate = new Date(stockPayload.lastUpdated)

    let stock: Stock

    if (this.stocks.length == 0 || this.stocks.filter(s => s.symbol == stockPayload.symbol).length == 0) {
      
      stock = <Stock>({
        symbol: stockPayload.symbol,
        pricesHistory: [<Price>({
          value: stockPayload.lastSalePrice,
          date: lastUpdatedDate
        })],
        currentPrice: stockPayload.lastSalePrice,
        lastUpdated: lastUpdatedDate
      })

      this.stocks.push(stock)
    }
    else {
      stock = this.stocks.filter(s => s.symbol == stockPayload.symbol)[0]

      stock.pricesHistory.push(<Price>({
        value: stockPayload.lastSalePrice,
        date: lastUpdatedDate
      }))
      stock.lastUpdated = lastUpdatedDate

      if (stockPayload.lastSalePrice != stock.currentPrice)
        stock.currentPrice = stockPayload.lastSalePrice
    }
  }

  onStockSelected(stock: Stock): void {
    this.selectedStock = stock
  }
}