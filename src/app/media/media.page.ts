import { Component, OnInit } from '@angular/core';
import { Urls } from '../constants/urls';
import { HttpClient } from "@angular/common/http";
import { ModalController, NavParams } from '@ionic/angular';
import { ImagemodalComponent } from '../imagemodal/imagemodal.component';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-media',
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss'],
})
export class MediaPage implements OnInit {
  images: any;
  user: any;
  urls = Urls;
  ActiveUser: any;
  today = Date.now();

  notifications = ["Your next session is tommorow 12:10 AM", "You can complete session till 12:20 AM", "Login into Oculus", "Todays was your best score till now, keep going", "Your next session is tommorow 12:10 AM"];
  constructor(
    private authService: AuthService,
    public toastController: ToastController,
    private http: HttpClient, public modalController: ModalController,
  ) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`${Urls.ACCOUNT}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
    })

    // this.http.get(`${Urls.FILES}/images/files`).subscribe(res => {
    //   console.log(res);
    //   this.images = res;
    // })
    this.ionViewWillEnter()
  }

  ionViewWillEnter() {
    // this.http.get(`${Urls.FILES}/images/files`).subscribe(res => {
    //   console.log(res);
    //   this.presentToast('Image loaded', 'primary', '200')
    //   this.images = res;
    // })
    // this.http.get("http://localhost:3000/api/files/images/files").subscribe(res => {
    //   console.log(res)
    // })
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

  }
  LogOut() {
    this.authService.logout(this.user);
    window.location.reload();

  }
  // onSelectImage(ev, i, im) {
  //   console.log(ev, i);
  //   this.presentModal(im, i)
  // }
  // async presentModal(w, i) {
  //   let v = {
  //     "name": w,
  //     "imageindex": i
  //   }
  //   console.log(w)
  //   const modal = await this.modalController.create({
  //     component: ImagemodalComponent,
  //     componentProps: v
  //   });
  //   modal.onDidDismiss().then((dataReturned) => {
  //     console.log(dataReturned)

  //     this.ionViewWillEnter()
  //   });
  //   return await modal.present();
  // }

  // async presentToast(d, c, t) {
  //   const toast = await this.toastController.create({
  //     message: d,
  //     duration: t,
  //     position: 'top',
  //     cssClass: 'normalToast',
  //     color: c
  //   });
  //   toast.present();
  // }

}
