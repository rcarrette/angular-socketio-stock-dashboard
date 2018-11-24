import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.less']
})
export class CompanyDetailsComponent implements OnInit {
  private symbol: string
  
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.symbol = this.route.snapshot.params['symbol']
  }
}
