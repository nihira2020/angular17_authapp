import { Component, DoCheck, OnInit, effect } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { UserService } from '../../_service/user.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { menu } from '../../_model/user.model';

@Component({
  selector: 'app-appmenu',
  standalone: true,
  imports: [MaterialModule, RouterOutlet, RouterLink],
  templateUrl: './appmenu.component.html',
  styleUrl: './appmenu.component.css'
})
export class AppmenuComponent implements OnInit, DoCheck {

  constructor(private service: UserService, private router: Router) {
    effect(() => {
      this.menulist = this.service._menulist();
    })
  }

  menulist!: menu[]
  Loginuser = ''
  showmenu = false;

  ngOnInit(): void {
    let userrole = localStorage.getItem('userrole') as string;
    this.service.Loadmenubyrole(userrole).subscribe(item => {
      this.menulist = item;
    })


  }

  ngDoCheck(): void {
    this.Loginuser = localStorage.getItem('username') as string;
    this.Setaccess();
  }

  Setaccess() {
    let userrole = localStorage.getItem('userrole');
    let currentUrl = this.router.url;
    if (currentUrl === '/register' || currentUrl === '/login' || currentUrl === '/resetpassword' ||
      currentUrl === '/forgetpassword') {
      this.showmenu = false;
    } else {
      this.showmenu = true;
    }
  }

}
