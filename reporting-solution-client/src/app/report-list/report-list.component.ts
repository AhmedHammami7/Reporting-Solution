import { Component, ViewChild } from '@angular/core';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';


export interface UsersData {
  
  name: string;
  id: number;
}
const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Test Report'},
  {id: 1560608796014, name: 'XtraReport'},
  {id: 1560608787815, name: 'Test'},
  {id: 1560608805101, name: 'Report 1'}
];
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css']
})
export class ReportListComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable,{static:true}) table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action:any ,obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:any){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
  public getReportNames(): String[] {
    return this.dataSource.map(item => item.name);
  }

}
