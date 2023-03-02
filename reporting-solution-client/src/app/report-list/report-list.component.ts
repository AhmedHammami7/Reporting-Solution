import { Router } from '@angular/router';
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
  @ViewChild(MatTable) mytable!: MatTable<any>;

  constructor(
    public dialog: MatDialog,
    private http: HttpClient,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
    this.loadReports();
    this.dataSource = new MatTableDataSource(this.dataSource);
  }

  loadName(name: string) {
    this.router.navigate(['/report-designer', name]);
  }
  loadReports() {
    this.http.get<any>('https://localhost:7021/api/Reports').subscribe(
      (data) => {
        this.dataSource = data;
        
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
        this.loadReports();
        // } else if (result.event == 'Update') {
        //   this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
        this.loadReports();
      }
    });
  }

  addRowData(row_obj: any) {
    this.http
      .post<any>('https://localhost:7021/api/Reports', {
        displayName: row_obj.name,
      })
      .subscribe({
        next: (response) => {
          // Add the new report item to the data source
          this.dataSource.push({
            name: response.displayName,
          });
          // Refresh the table
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.loadReports();
          //this.mytable.renderRows();// Do something when the observable completes (if necessary)
        },
      });
  }
  // updateRowData(row_obj: any) {
  //   this.dataSource = this.dataSource.filter(
  //     (value: { id: any; name: any }) => {
  //       if (value.id == row_obj.id) {
  //         value.name = row_obj.name;
  //       }
  //       return true;
  //     }
  //   );
  // }
  deleteRowData(row_obj: any) {
    const reportName = row_obj.name;
    // Call the DELETE API to remove the report
    this.http
      .delete<any>(`https://localhost:7021/api/Reports/${reportName}`)
      .subscribe({
        next: (data) => {
          console.log('Report deleted successfully');
          // Remove the deleted report from the dataSource
          const index = this.dataSource.findIndex(
            (item: any) => item.name === reportName
          );
          this.dataSource.splice(index, 1);

        
        },
        error: (error) => {
          console.log(error);
        },
        complete: () => {
          this.loadReports();
          this.mytable.renderRows();
          // Do something when the observable completes (if necessary)
        },
      });
  }
}
