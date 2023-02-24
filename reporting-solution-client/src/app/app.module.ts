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
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    GenerationComponent,
    ReportDesignerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'generation', component: GenerationComponent, pathMatch: 'full' },
      { path: 'designer', component: ReportDesignerComponent, pathMatch: 'full' },

    ]),
    DxReportDesignerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
