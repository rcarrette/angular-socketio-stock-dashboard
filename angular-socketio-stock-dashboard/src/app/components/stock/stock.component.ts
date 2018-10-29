import { Component, AfterViewInit } from '@angular/core';

import { Chart } from 'chart.js'

@Component({
  selector: 'stock-chart',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent implements AfterViewInit {
  chart: any = {}

  constructor() { }

  ngAfterViewInit() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['d'],
        datasets: [
          {
            data: [22, 24],
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