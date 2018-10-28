import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-headline',
  templateUrl: './headline.component.html',
  styleUrls: ['./headline.component.less']
})
export class HeadlineComponent implements OnInit {
  title = 'Live stock dashboard'
  subtitle = 'powered by IEX Ⓒ'
  subtitleHref = 'https://iextrading.com'

  constructor() { }

  ngOnInit() {
  }

}
