import { Component,NgModule, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';
import { AppComponent} from '../app.component'
@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html'
})

export class GenerationComponent  {    
    @NgModule({
        imports: [
          ]
      })
    appComponent = new AppComponent;
    @ViewChild('printFrame', { static: true })
    printFrame!: ElementRef;
    @ViewChild('myDropDownList', { static: true })
    myDropDownList!: ElementRef;
    selectedFormat = 'pdf';
    printUrl = this.appComponent?.hostUrl;    
    constructor(private sanitizer: DomSanitizer, private _http: HttpClient) {
    }
    onChange($event: any) {
        this.selectedFormat = $event.target.value;
    }
    printInNewWindow(url: string) {
        var frameElement = window.open(url, "_blank");
        frameElement?.addEventListener("load", function (e) {
            if (frameElement && frameElement.document.contentType !== "text/html")
                frameElement.print();
        });
    }
    printWithIFrame(url: string) {
        var iframe = this.printFrame.nativeElement as HTMLIFrameElement;
        iframe.addEventListener("load", () => {
            if (iframe.contentDocument?.contentType != "text/html")
                iframe.contentWindow?.print();
        });
        this.printUrl = this.printUrl;
    }  
    export(url: string) {
        window.open(url, "_blank");
    }    
    downloadFile(url: string) {
        this._http.get(url+'api/Generation/Export', {
            params: { "format": this.selectedFormat }, responseType: 'blob'
        }).subscribe(blob => {
            saveAs(blob, 'XtraReport1.' + this.selectedFormat.toLowerCase());
        });
    }
}
