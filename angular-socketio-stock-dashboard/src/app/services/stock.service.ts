import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import * as io from 'socket.io-client'

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

  //TODO return Observable<Stock> instead of string
  onStockUpdate(): Observable<string> {
    return new Observable<string>(observer => {
      this.socket.on('message', (data: string) => observer.next(data))
    })
  }

  onDisconnect(): void {
    this.socket.on('disconnect', () => console.log('Disconnected.'))
  }
}