import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { MissingPeopleService } from './missing-people.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PersonDetailComponent } from '../person-detail/person-detail.component';

@Component({
  selector: 'app-missing-people',
  templateUrl: './missing-people.component.html',
  styleUrls: ['./missing-people.component.scss']
})
export class MissingPeopleComponent implements AfterViewInit {

  constructor(
    private missingPeopleService: MissingPeopleService,
    private _liveAnnouncer: LiveAnnouncer,
    public dialog: MatDialog,
  ) { }

  displayedColumns: string[] = ['nome', 'idade', 'sexo', 'urlFoto'];
  dataSource = new MatTableDataSource();
  tableFilter: string = 'nome';
  page: number = 0;
  perPage: number = 200

  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;

  ngAfterViewInit() {
    this.missingPeopleService.getMissingPeople(this.page, this.perPage).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.content)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    )


  }

  updateFilter(event: any, tableFilter: string) {
    const val = event.target.value.toLowerCase();

    this.missingPeopleService.getMissingPeople(this.page, this.perPage).subscribe(
      (data: any) => {
        this.dataSource = new MatTableDataSource(data.content) //restart the rows

        const temp = this.dataSource.filteredData.filter(
          function (d: any) {
            if (tableFilter == 'idade') {
              return d[tableFilter] == val ? true : false
            }
            else {
              return d[tableFilter].toLowerCase().indexOf(val) !== -1 || !val
            }
          }
        )
        this.dataSource = new MatTableDataSource(temp) //update the rows
      }
    )
  }

  openModal(row: any) {
    const dialogRef = this.dialog.open(PersonDetailComponent, {
      width: '1000px',
      height: '650px',
      data: {
        row
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {

      }
      else {

      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

}
