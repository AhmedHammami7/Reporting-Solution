import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxReportDesignerModule } from 'devexpress-reporting-angular';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { GenerationComponent } from './generation/generation.component';
import { ReportDesignerComponent } from './report-designer/report-designer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReportListComponent } from './report-list/report-list.component';
//imports of angular material
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    GenerationComponent,
    ReportDesignerComponent,
    ReportListComponent,
    DialogBoxComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: 'generation', component: GenerationComponent, pathMatch: 'full' },
      { path: 'designer', component: ReportDesignerComponent, pathMatch: 'full' },
      { path: 'report-designer/:reportName', component: ReportDesignerComponent }
    ]),
    DxReportDesignerModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent,ReportListComponent ]
})
export class AppModule { }
