import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ActionId } from 'devexpress-reporting/dx-reportdesigner'

@Component({
  selector: 'app-report-designer',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './report-designer.component.html',
  styleUrls: [
    "../../../node_modules/devextreme/dist/css/dx.material.orange.light.css",
    "../../../node_modules/devexpress-richedit/dist/dx.richedit.css",
    "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.common.css",
    "../../../node_modules/@devexpress/analytics-core/dist/css/dx-analytics.material.orange.light.css",
    "../../../node_modules/@devexpress/analytics-core/dist/css/dx-querybuilder.css",
    "../../../node_modules/devexpress-reporting/dist/css/dx-webdocumentviewer.css",
    "../../../node_modules/devexpress-reporting/dist/css/dx-reportdesigner.css"
]
})
export class ReportDesignerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  title = 'reporting-solution';
    // If you use the ASP.NET Core backend:
  getDesignerModelAction = "/DXXRD/GetDesignerModel";
  // The report name.
  //reportName = "TestReport34";
  // The backend application URL.
  reportName="";
  host = 'https://localhost:7021/';
  
   CustomizeMenuActions(event:any) {
     // Hide the "NewReport" and "OpenReport" actions. 
     var newreportAction = event.args.GetById(ActionId.NewReport);
      if (newreportAction)
         newreportAction.visible = false;
    var saveAction = event.args.GetById(ActionId.Save);
      if (saveAction)
          saveAction.visible = false;
     var openAction = event.args.GetById(ActionId.OpenReport);
      if (openAction)
         openAction.visible = false;
 }
  //reportList: { [key: string]: string }[] = [];
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.reportName = params['reportName'];
      console.log(params);
      
    });
    // this.http.get<{ [key: string]: string }[]>(`${this.host}api/Reports`)
    //   .subscribe(data => {
    //     const report = data[0];
    //     this.reportName = report[1];
    //   });
  }

}