import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { users } from '../../_model/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserupdateComponent } from '../userupdate/userupdate.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  userlist!: users[];
  displayedColumns: string[] = ["username", "name", "email", "phone", "status", "role", "action"];
  datasource: any;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: UserService, private toastr: ToastrService, private dialog: MatDialog) {

  }
  ngOnInit(): void {
    this.Loadusers();
  }


  Loadusers() {
    this.service.Getallusers().subscribe(item => {
      this.userlist = item;
      this.datasource = new MatTableDataSource<users>(this.userlist);
      this.datasource.paginator = this.paginator;
      this.datasource.sort = this.sort;
    })
  }

  updaterole(code: string) {
    this.Openpopup(code,'role');
  }

  updatestatus(code: string) {
    this.Openpopup(code,'status');
  }

  Openpopup(username: string, type: string) {
    this.dialog.open(UserupdateComponent, {
      width: '30%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
      data: {
        username: username,
        type: type
      }
    }).afterClosed().subscribe(item=>{
      this.Loadusers();
    })
  }



}
