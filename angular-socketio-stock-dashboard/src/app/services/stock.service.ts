import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import * as io from 'socket.io-client'

import { Stock } from '../models/stock'
import { Price } from '../models/price'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private socket;

  constructor() { }

  init(): void {
    this.socket = io('https://ws-api.iextrading.com/1.0/tops')
  }

  subscribeToStocks(stockSymbols: string): void {
    this.socket.emit('subscribe', stockSymbols) //subscribe to topics. can be multiple (i.e. appl,fb,googl,tsla)
  }

  unsubscribeToStocks(stockSymbols: string): void {
    this.socket.emit('unsubscribe', stockSymbols)
  }

  onStockUpdate(): Observable<Stock> {
    return new Observable<Stock>(observer => {
      this.socket.on('message', (data: string) => observer.next(this.stringToStock(data)))
    })
  }

  onDisconnect(): void {
    this.socket.on('disconnect', () => console.log('IEX socket disconnected.'))
  }

  stringToStock(data: string): Stock {
    const stockPayload: any = JSON.parse(data)

    const lastUpdatedDate = new Date(stockPayload.lastUpdated)

    const currentStockPrice: Price = <Price>({
      value: stockPayload.lastSalePrice,
      date: lastUpdatedDate
    })

    return <Stock>({
      symbol: stockPayload.symbol,
      pricesHistory: [currentStockPrice],
      currentPrice: currentStockPrice,
      lastUpdated: lastUpdatedDate
    })
  }
}