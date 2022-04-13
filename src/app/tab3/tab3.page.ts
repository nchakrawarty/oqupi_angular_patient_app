import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { Urls } from '../constants/urls';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  flag = false;
  appoint = true;
  doclist = false;
  adddoc = false;
  user: any;
  loggedInUser: string;

  constructor(
    private nativePageTransitions: NativePageTransitions,
    private authService: AuthService,
    private http: HttpClient, private router: Router,
    private loadingCtrl: LoadingController,
    public toastController: ToastController
  ) {
    // LoopBackConfig.setBaseURL("http://192.168.0.117:3000");
    while (this.colors.length < 100) {
      do {
        var color = Math.floor((Math.random() * 1000000) + 1);
      } while (this.colors.indexOf(color) >= 0);
      this.colors.push("#" + ("ffffff"/* + color.toString(16)*/).slice(-6));
    }
    this.ActiveUser = {
      AccountName: "Account Name",
      ClinicName: "CLinic Name",
      DOB: "DOB",
      email: "email@gmail.com",
      realm: "role",
      username: "Username"

    }

  }
  storage;
  id: string;
  token: string;
  centerData: any;
  UserCenter: any;
  w: any;
  role: any;
  maxNegXValue: string;
  maxNegYValue: string;
  maxPosXValue: string;
  maxPosYValue: string;
  sessionDateTime: string;
  sessionNumber: number;
  examRoomMaxNegXValue: string;
  examRoomMaxNegYValue: string;
  examRoomMaxPosXValue: string;
  examRoomMaxPosYValue: string;
  totalTimeSpent: any;
  upTime: number;
  downTime: number;
  leftTime: number;
  rightTime: number;
  rotation = [{ "label": "Left Rotation", "val": "any", "name": "maxNegXValue", "date": "", "img": "Headtopleft.svg" }, { "label": "Right Rotation", "val": "any", "name": "maxPosXValue", "date": "", "img": "Headtopright.svg" }, { "label": "Cervical Flexion", "val": "any", "name": "maxNegYValue", "date": "", "img": "Headlookingdown.svg" }, { "label": "Cervical Extension", "val": "any", "name": "maxPosYValue", "date": "", "img": "Headlookingtop.svg" }
  ];
  session: any;
  patientList: any;
  doctorList: any;
  gameList: any;
  selectedgame: any;
  selecteddoctor: any;
  selectedrole: any;
  colors = [];
  selectedSession: any;
  sessionLength: number;
  selectedSessionid: any;
  ActiveUser: any;
  today = Date.now();
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50
    }
    this.nativePageTransitions.slide(options);
    this.http.get(`${Urls.ACCOUNT}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
    })

    // this.docList();
    this.appointments();
  }

  /*----------------- PATIENT LIST ------------------------------------*/
  adddc = "not-active";
  addDoc() {
    console.log("Hi");
    this.doclist = false;
    this.adddoc = true;
    this.appoint = false;
    this.adddc = "active"
    this.doclc = "not-active";
    this.appointc = "not-active";
    // const items = (document.getElementById('list'));
    // console.log(items)
  }
  /*----------------- Doctor LIST ------------------------------------*/
  doclc = "not-active";
  docList() {
    this.doclist = true;
    this.adddoc = false;
    this.appoint = false;
    this.appointc = "not-active";
    this.adddc = "not-active"
    this.doclc = "active";
    this.http.get(`${Urls.DOCTOR}`).subscribe((res: any) => {
      this.doctorList = res;
      console.log(this.doctorList)
    })
    // const items = (document.getElementById('list'));
    // console.log(items)
  }

  /*------------------------------------ Appointments---------------------------------------*/
  appointc = "not-active";
  appointments() {
    this.doclist = false;
    this.adddoc = false;
    this.appoint = true;
    this.adddc = "not-active"
    this.doclc = "not-active";
    this.appointc = "active";
    this.http.get(`${Urls.PATIENT}`).subscribe((res: any) => {
      this.patientList = res;
      console.log(this.patientList)
    })
  }
  /*------------------------------------------------------*/

  /*-----------------------Adding Patient-----------------------------------*/
  // addPat() {
  //   console.log("add Patient");
  //   this.doclist = false;
  //   this.adddoc = true;
  //   this.appoint = false;
  // }

  /*-------------------------------------------------------------------------*/

  /*--------------------Query patient list --------------------------------*/
  queryAcronyms(ev) {
    var patListq = this.patientList;
    var q = [];
    console.log(ev.target.value)
    const val = ev.target.value;
    if (val && val.trim() !== '') {
      patListq = patListq.filter((item) => {
        q.push(item)
        console.log(item)
        console.log(q)
        // return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    // this.http.get(`${Urls.PATIENT}`).subscribe((res: any) => {
    //   this.patientList = res;
    //   console.log(this.patientList)
    // })
  }
  /*-----------------------------------------------------------------*/
  register(v) {
    console.log(v)
    this.authService.register(v.form.value.fname,
      v.form.value.lname,
      v.form.value.mobile,
      v.form.value.email,
      v.form.value.username,
      v.form.value.age,
      v.form.value.gender,
      v.form.value.bloodgroup,
      v.form.value.password,
      v.form.value.selectedrole,
      " v.form.value.appointmentDate",
      "v.form.value.selecteddoctor")
      .subscribe(
        data => {
          // if (this.returnUrl === '/') {
          //   this.returnUrl = '/dashboard';
          // } else {
          //   console.log(data, this.returnUrl);

          // }
          // this.router.navigate([this.returnUrl]);
          console.log(data, v.value);
          // this.http.post<any>(`${Urls}/gamesPrescribeds`, {
          //   "prescribedOn": Date,
          //   "prescribedBy": v.form.value.selecteddoctor,
          //   "testPX": true,
          //   "testPY": true,
          //   "testRX": true,
          //   "testRY": true,
          //   "totalSessionTime": 10,
          //   "targetSpeed": 0,
          //   "performance": [
          //     "string"
          //   ],
          //   "bestPerformanceValue": [
          //     {}
          //   ],
          //   "doctorId": v.form.value.selecteddoctor,
          //   "patientId": "61da91ee8b3149671ce56d52",
          //   "gameId": "60420cf8bc98c10a067bed71"
          // }).pipe(map(gameprescribed => {

          // }))

        },
        error => {
          console.log(error, v);
        });
  }
  onLogout() {
    this.authService.logout(this.user);
  }

  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

  }
  close() {
    this.flag = false;
  }
  edit(d, i) {
    console.log(d, i)
  }
  ionViewWillEnter() {
    this.ngOnInit()
  }

}