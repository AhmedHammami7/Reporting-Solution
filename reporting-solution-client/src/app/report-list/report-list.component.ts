import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface UsersData {
  name: string;
  id: number;
}
@Component({
  selector: 'app-report-list',
  templateUrl: './report-list.component.html',
  styleUrls: ['./report-list.component.css'],
})
export class ReportListComponent {
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: any = [];
  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;

  constructor(public dialog: MatDialog,private http: HttpClient) {
    this.http.get<any>('https://localhost:7021/api/Reports').subscribe(
      (data) => {
        this.dataSource = data;
        this.table.renderRows();
      },
      (error) => {
        console.log(error);
      }
    );
    
  }
  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: obj,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any) {
    var d = new Date();
    this.dataSource.push({
      id: d.getTime(),
      name: row_obj.name,
    });
    this.table.renderRows();
  }
  updateRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: { id: any; name: any; }) => {
      if (value.id == row_obj.id) {
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: any) {
    this.dataSource = this.dataSource.filter((value: { id: any; }) => {
      return value.id != row_obj.id;
    });
  }
}
