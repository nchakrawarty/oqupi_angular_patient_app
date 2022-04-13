import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  currentUserName: any;
  user;
  id: string;
  token: string;
  role: any;
  UserCenter: any;
  ActiveUser: any;
  constructor(
    private authService: AuthService,
    private http: HttpClient, private router: Router,
    private menu: MenuController,
  ) {
    // this.role = "";
    this.ActiveUser = {
      AccountName: "Account Name",
      ClinicName: "CLinic Name",
      DOB: "DOB",
      email: "email@gmail.com",
      role: "Patient",
      username: "Username"

    }
    this.onLoad()
  }

  async ngOnInit() {
    this.user = await JSON.parse(localStorage.getItem("currentUser"));
    console.log(this.user)
    this.id = this.user.userId;
    this.token = this.user.id;
    this.getUserCenters();
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  onLoad() {
    // console.log("from tabs")
    this.user = JSON.parse(localStorage.getItem("currentUser"));
    // console.log(this.storage);
    this.id = this.user.userId;
    this.token = this.user.id;
    // this.http.get(`${Urls.USERS}/${this.id}?access_token=${this.token}`).subscribe((res: any) => {
    //   if (res.role === 'admin') {
    //     this.role = true;
    //   }
    //   // this.getCenterData("")
    // })
  }
  onMenu() {
    // console.log("menu clicked")
    this.router.navigate(['/menu']);
  }
  LogOut() {
    console.log("Logged out")
    this.authService.logout(this.user);
  }

  getUserCenters() {
    this.http.get(`${Urls.ACCOUNT}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
    })
  }
}
