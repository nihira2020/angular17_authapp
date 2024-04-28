import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../material.module';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../_service/user.service';
import { registerconfirm } from '../../_model/user.model';

@Component({
  selector: 'app-confirmotp',
  standalone: true,
  imports: [FormsModule, MaterialModule,RouterLink],
  templateUrl: './confirmotp.component.html',
  styleUrl: './confirmotp.component.css'
})
export class ConfirmotpComponent implements OnInit {

  otptext = ''
  regresponse!: registerconfirm;
  _response: any;

  constructor(private toastr: ToastrService, private router: Router, private service: UserService) {

  }
  ngOnInit(): void {
    this.regresponse = this.service._registerresp();
  }

  confirmOTP() {

    this.regresponse.otptext = this.otptext;
    this.service.Confirmregisteration(this.regresponse).subscribe(item => {
      this._response = item;
      if (this._response.result == 'pass') {
           this.toastr.success('Registeration completed successfully.','Success');
           this.service._registerresp.set({
             userid: 0,
             username: '',
             otptext: ''
           })
           this.router.navigateByUrl('/login');
      }else{
        this.toastr.error('Failed Due to:' + this._response.message,'Registeration Failed');
      }
    })

  }

}
