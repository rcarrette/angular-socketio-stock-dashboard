import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CompanyDetailsComponent } from './components/company-details/company-details.component'

const routes: Routes = [
  { path: 'company/:symbol', component: CompanyDetailsComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
