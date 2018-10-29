import { Component, Input, AfterViewChecked } from '@angular/core';

import { Chart } from 'chart.js'

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
    console.log(this.stock)

    if (this.stock && !this.stock.chart) { //TODO is chart already exists => just update the datasets:data []
      this.stock.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: ['price'],
          datasets: [
            {
              data: this.stock.pricesHistory,
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