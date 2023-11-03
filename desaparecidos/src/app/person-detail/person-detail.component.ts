import { Component, OnInit, Inject } from '@angular/core';
import { PersonDetailService } from './person-detail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  constructor( 
    private personDetailService: PersonDetailService,
    private router: Router,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
  ) { }

  dataSource: any = this.data.row
  idPerson: number = this.data.row.id

  ngOnInit(): void {
    this.personDetailService.getPersonDetail(this.idPerson).subscribe(
      (result: any) => {
        this.dataSource = result
        console.log("result: ", result)
        console.log("Teste Data: ", this.data.row)
        console.log("Teste DataSource: ", this.dataSource)
      }
    )
  }

  closeDialog(): void {
    this.dialogRef.close();
    this.router.navigate(['not-found']);
  }

}
