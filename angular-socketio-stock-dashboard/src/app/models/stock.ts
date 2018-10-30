import { Price } from './price'

export class Stock {
    symbol: string
    pricesHistory: Price[]
    currentPrice: Price
    lastUpdated: Date
    chart: any
}