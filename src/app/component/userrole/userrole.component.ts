import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../_service/user.service';
import { menupermission, menus, roles } from '../../_model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-userrole',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './userrole.component.html',
  styleUrl: './userrole.component.css'
})
export class UserroleComponent implements OnInit {

  rolelist!: roles[];
  menulist!: menus[];
  accessarray!: FormArray<any>;
  useraccess!: menupermission
  _response:any;

  constructor(private builder: FormBuilder, private toastr: ToastrService, private service: UserService) {

  }
  ngOnInit(): void {
    this.loadroles();
    this.loadmenus('');
  }

  roleform = this.builder.group({
    userrole: this.builder.control('', Validators.required),
    access: this.builder.array([])
  })

  Generatemenurow(input: menus,_access: menupermission,role:string) {
    return this.builder.group({
      menucode: this.builder.control(input.code),
      haveview: this.builder.control(_access.haveview),
      haveadd: this.builder.control(_access.haveadd),
      haveedit: this.builder.control(_access.haveedit),
      havedelete: this.builder.control(_access.havedelete),
      userrole:this.builder.control(role)
    })
  }

  Addnewrow(input: menus, _access: menupermission,role:string) {
    this.accessarray.push(this.Generatemenurow(input,_access,role))
  }

  get getrows() {
    return this.roleform.get('access') as FormArray;
  }

  loadroles() {
    this.service.Getallroles().subscribe(item => {
      this.rolelist = item;
    })
  }

  loadmenus(userrole: string) {
    this.accessarray = this.roleform.get('access') as FormArray;
    this.accessarray.clear();
    this.service.Getallmenus().subscribe(item => {
      this.menulist = item;
      if (this.menulist.length > 0) {

        this.menulist.map((o: menus) => {

          if (userrole != '') {
            this.service.Getmenupermission(userrole, o.code).subscribe(item => {
              this.useraccess = item;
              this.Addnewrow(o, this.useraccess,userrole);
            })
          } else {
            this.Addnewrow(o, {
              code: '',
              name: '',
              haveview: false,
              haveadd: false,
              haveedit: false,
              havedelete: false,
              userrole: '',
              menucode: ''
            },'');
          }



        })
      }
    })
  }

  rolechange(event: any) {
    let selectedrole = event.value;
    this.loadmenus(selectedrole)

  }

  Saveroles() {

    if(this.roleform.valid){
      let formarry=this.roleform.value.access as menupermission[]
      this.service.Assignrolepermission(formarry).subscribe(item=>{
        this._response=item;
        if (this._response.result == 'pass') {
          this.toastr.success('Permission assigned successfully', 'Saved');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Menu access assignment')
        }
      })
    }

  }

}
