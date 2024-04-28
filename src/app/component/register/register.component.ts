import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { Router, RouterLink } from '@angular/router';
import { registerconfirm, userregister } from '../../_model/user.model';
import { UserService } from '../../_service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private service: UserService, private toastr: ToastrService,
    private router: Router) {

  }

  _response: any;

  _regform = this.builder.group({
    username: this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    password: this.builder.control('', Validators.required),
    confirmpassword: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    email: this.builder.control('', Validators.required),
    phone: this.builder.control('', Validators.required)
  })

  proceedregister() {
    if (this._regform.valid) {
      let _obj: userregister = {
        userName: this._regform.value.username as string,
        name: this._regform.value.name as string,
        phone: this._regform.value.phone as string,
        email: this._regform.value.email as string,
        password: this._regform.value.password as string
      }
      this.service.Userregisteration(_obj).subscribe(item => {
        this._response = item;
        console.log(this._response);
        if (this._response.result == 'pass') {
          let _confirmobj: registerconfirm = {
            userid: this._response.message,
            username: _obj.userName,
            otptext: ''
          }
          this.service._registerresp.set(_confirmobj);
          this.toastr.success('Validate OTP & complete the registeration', 'Registeration');
          this.router.navigateByUrl('/confirmotp');
        } else {
          this.toastr.error('Failed due to : ' + this._response.message, 'Registeration Failed')
        }
      });

    }
  }

}
