import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Globals } from 'src/app/globals'

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.less']
})
export class CompanyDetailsComponent implements OnInit {
  private symbol: string
  
  constructor(private route: ActivatedRoute, private router: Router, private globals: Globals) { }

  ngOnInit() {
    this.symbol = this.route.snapshot.params['symbol']

    //redirect to home if the provided route parameter is not a valid stock symbol
    if (this.globals.stockSymbols.filter(symbol => symbol == this.symbol.toLowerCase()).length == 0)
      this.router.navigate(['/'])
  }
}
