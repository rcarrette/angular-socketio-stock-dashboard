import { Component, Input, AfterViewChecked } from '@angular/core';

import { Chart } from 'chart.js'
import * as moment from 'moment';

import { Stock } from '../../models/stock'

@Component({
  selector: 'stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.less']
})
export class StockDetailsComponent implements AfterViewChecked {
  @Input() stock: Stock

  constructor() { }

  ngAfterViewChecked() {  //TODO create chart on another event
      //TODO delete "chart" prop from Stock and use a directive instead to build the chart with the stock's data =>
      //https://codepen.io/k3no/pen/rrRLvm + https://gist.github.com/anupkrbid/6447d97df6be6761d394f18895bc680d

    if (this.stock && !this.stock.chart) { //TODO if chart already exists => just update the datasets:data []
      this.stock.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.stock.pricesHistory.map(p => moment(p.date).format('YYYY-MM-DD HH:mm:ss')),
          datasets: [
            {
              data: this.stock.pricesHistory.map(p => p.value),
              borderColor: '#3cba9f',
              fill: false
            }
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }]
          }
        }
      })
    }
  }
}