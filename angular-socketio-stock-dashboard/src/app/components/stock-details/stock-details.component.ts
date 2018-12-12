import { Component, Input, OnChanges, OnDestroy } from '@angular/core'
import { Chart } from 'angular-highcharts'
import { Subscription } from 'rxjs'

import * as moment from 'moment'

import { StockService } from 'src/app/services/stock.service'
import { Stock } from '../../models/stock'

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.less']
})
export class StockDetailsComponent implements OnChanges, OnDestroy {
  @Input() stock: Stock
  chart: any
  stockSubscription: Subscription

  constructor(private stockService: StockService) { }

  ngOnChanges() {
    this.initChart()
  }

  ngOnDestroy() {
    if (this.stockSubscription)
      this.stockSubscription.unsubscribe()
  }

  initChart(): void {
    if (this.stock) {
      let chart = new Chart({
        chart: {
          type: 'line',
          backgroundColor: '#1a1a1a'
        },
        series: [{
          name: this.stock.symbol,
          data: this.stock.pricesHistory.map(p => p.value)
        }],
        xAxis: {
          categories: this.stock.pricesHistory.map(p => this.dateToFormattedString(p.date))
        },
        yAxis: {
          title: {
            text: 'Stock price'
          },
          gridLineColor: '#262626',
          labels: {
            format: '${value}'
          }
        },
        plotOptions: {
          series: {
            dataLabels: {
              format: '${y}',
              color: '#ffffff',
              enabled: true
            }
          }
        },
        title: {
          text: ''
        },
        legend: {
          enabled: false
        },
        tooltip: {
          useHTML: true,
          formatter: function () {
            return '<b>$' + this.y + '</b> <small>' + this.x + '</small>'
          }
        },
        credits: {
          enabled: false
        }
      })

      this.chart = chart

      this.stockSubscription = this.stockService.onStockUpdate().subscribe((stock: Stock) => this.addPoint(stock))
    }
  }

  addPoint(stock: Stock): void {
    const isEqualToLastValue = (arr, value) => arr[arr.length - 1].y == value //TODO use lodash or ramda every time I manipulate an array

    if (stock.symbol == this.stock.symbol && !isEqualToLastValue(this.chart.ref$.source.value.series[0].data, stock.currentPrice.value)) {
      this.chart.ref$.source.value.xAxis[0].categories.push(this.dateToFormattedString(stock.currentPrice.date))
      this.chart.addPoint(stock.currentPrice.value)
    }
  }

  dateToFormattedString(date: Date): string {
    return moment(date).format('MM/DD/YYYY HH:mm:ss')
  }
}