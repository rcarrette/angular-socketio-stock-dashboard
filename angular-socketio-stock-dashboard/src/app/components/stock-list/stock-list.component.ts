import { Component, OnInit } from '@angular/core'

import { Stock } from '../../models/stock'
import { StockService } from '../../services/stock.service'

@Component({
  selector: 'stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.less']
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = []

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.stockService.init()

    this.stockService.subscribeToStocks('googl,msft,aapl,amzn,fb,tsla')

    this.stockService.onStockUpdate().subscribe((data: string) => {
      this.onStockUpdate(data)
    })
  }

  onStockUpdate(data: string): void {
    //TODO css animation card flash

    console.log(`stock udpate received: ${data}`)

    let stock: any = JSON.parse(data)

    if (this.stocks.length == 0 || this.stocks.filter(s => s.symbol == stock.symbol).length == 0) {
      this.stocks.push(<Stock>({
        name: stock.symbol,
        symbol: stock.symbol,
        pricesHistory: [stock.lastSalePrice],
        lastUpdated: new Date(stock.lastUpdated)  //TODO use moment
      }))
    }
    else {
      let existingStock: Stock = this.stocks.filter(s => s.symbol == stock.symbol)[0]

      existingStock.pricesHistory.push(stock.lastSalePrice)
      existingStock.lastUpdated = new Date(stock.lastUpdated) //TODO use moment
    }
  }
}