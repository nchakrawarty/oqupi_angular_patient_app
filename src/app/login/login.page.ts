import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  users: any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute,
    public toastController: ToastController,) { }

  ngOnInit() {
    console.log(this.users);
    this.users = null;
  }

  login(v) {
    this.authService.login(v.form.value.email, v.form.value.password)
      .subscribe(
        data => {

          // if (this.returnUrl === '/') {
          //   this.returnUrl = '/dashboard';
          // } else {
          //   console.log(data, this.returnUrl);

          // }
          // this.router.navigate([this.returnUrl]);
          console.log(data);
          this.presentToast("Logged in successfully", v.form.value.email, "primary");
        },
        error => {
          console.log(error, v);
          this.presentToast(error.statusText + ": Wrong Email or password", v.form.value.email, "danger")

        });
  }
  async presentToast(d, e, c) {
    const toast = await this.toastController.create({
      message: d + "<br>" + e + "<br>",
      duration: 2000,
      position: 'top',
      cssClass: 'normalToast',
      color: c
    });
    toast.present();
  }

}
