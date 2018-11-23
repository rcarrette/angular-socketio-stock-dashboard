import { Component, Input, OnChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { StockService } from 'src/app/services/stock.service';

import { Stock } from '../../models/stock'

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.less']
})
export class StockDetailsComponent implements OnChanges {
  @Input() stock: Stock
  chart: any;

  constructor(private stockService: StockService) { }

  ngOnChanges() {
    this.initChart()
  }

  initChart(): void {
    if (this.stock) {
      let chart = new Chart({
        chart: {
          type: 'line'
          // backgroundColor: '#000000'
        },
        title: {
          text: ''
        },
        credits: {
          enabled: false
        },
        series: [{
          name: this.stock.symbol,
          data: this.stock.pricesHistory.map(p => p.value)
        }]
      })

      this.chart = chart

      //TODO use Rxjs multicasting instead (to allow all subscribers to get the same value at the same time)
      this.stockService.onStockUpdate().subscribe((stock: Stock) => {
        this.addPoint(stock)
      })
    }
  }

  addPoint(stock: Stock): void {
    const isEqualToLastValue = (arr, value) => arr[arr.length - 1].y == value //TODO use lodash or ramda every time I manipulate an array

    if (stock.symbol == this.stock.symbol && !isEqualToLastValue(this.chart.ref$.source.value.series[0].data, stock.currentPrice))
      this.chart.addPoint(stock.currentPrice)
  }
}