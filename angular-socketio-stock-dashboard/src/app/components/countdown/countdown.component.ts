import { Component, OnInit } from '@angular/core'

import * as moment from 'moment'

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.less']
})
export class CountdownComponent implements OnInit {
  remainingTimeForNasdaqToOpen: string
  isNasdaqOpen: boolean

  private nasdaqOpeningTime: moment.Moment
  private nasdaqClosingTime: moment.Moment

  constructor() {
    this.isNasdaqOpen = true //to prevent component flash on page load

    this.nasdaqOpeningTime = moment().utcOffset(0).set({ hour: 13, minute: 30, second: 0, millisecond: 0 })
    this.nasdaqClosingTime = moment().utcOffset(0).set({ hour: 21, minute: 0, second: 0, millisecond: 0 })

    //Nasdaq opening hours: FR: 15h30 to 22h == UTC: 2h30 PM to 9h PM
  }

  ngOnInit() {
    setInterval(() => this.checkRemainingSecondsForNasdaqToOpen(), 1000)
  }

  checkRemainingSecondsForNasdaqToOpen(): void {
    let now = moment().utcOffset(0)

    this.isNasdaqOpen = now.isBetween(this.nasdaqOpeningTime, this.nasdaqClosingTime)

    if (!this.isNasdaqOpen) {
      this.remainingTimeForNasdaqToOpen = moment(this.nasdaqOpeningTime.diff(now)).format("HH:mm:ss")
    }
  }
}
