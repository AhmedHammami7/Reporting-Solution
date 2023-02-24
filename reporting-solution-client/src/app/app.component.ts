import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'reporting-solution';
  getDesignerModelAction = "DXXRD/GetDesignerModel";
  reportUrl = "XtraReport1";
  hostUrl = 'https://localhost:7021/';
  constructor(private router?: Router){}
  isHomePage(): boolean {
    return this.router?.url === '/';
  }

  
}
