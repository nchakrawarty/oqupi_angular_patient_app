import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoadingController, ModalController, NavParams } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';
import { Urls } from '../constants/urls';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';
import { DatePipe } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  selectedgame: any;
  selecteddoctor: any;
  selectedrole: any;
  flag = false;
  appoint = true;
  patlist = false;
  addpat = false;
  indClick = false;
  user: any;
  loggedInUser: string;
  doctorList: any;
  selpat: any;
  timeslot: any;
  min: any;
  constructor(
    private datePipe: DatePipe,
    private authService: AuthService,
    private http: HttpClient, private router: Router,
    private nativePageTransitions: NativePageTransitions,
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
    this.selpat = {
      patientName: "Account Name",
      age: "CLinic Name",
      contactNum: "DOB",
      email: "email@gmail.com"
    }
    this.gameList = {
      gameName: "",
      id: ""
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
  gameList: any;
  colors = [];
  selectedSession: any;
  sessionLength: number;
  selectedSessionid: any;
  ActiveUser: any;
  today = Date.now();
  appointmentDateView = [];
  td: any;
  date: Date;
  appointmentList: any;
  ngOnInit() {
    this.timeslot = ["12:00", "13:00", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"]
    console.log(this.appointmentDateView)
    this.td = this.datePipe.transform(this.today, "yyyy-MM-dd");
    this.min = this.td;
    this.indClick = false;
    let options: NativeTransitionOptions = {
      direction: 'left',
      duration: 100,
      slowdownfactor: -1,
      iosdelay: 50
    }
    // this.nativePageTransitions.slide(options);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.http.get(`${Urls.ACCOUNT}/${this.user.userId}?access_token=${this.user.id}`).subscribe((res: any) => {
      this.ActiveUser = res;
      console.log(res)
      this.ActiveUser.AccountName = res.username;
      this.ActiveUser.role = res.role;
      this.ActiveUser.DOB = res.DOB;
    })

    this.patList();
    this.getDoc();

  }
  sendEmail() {
    this.http.post(`${Urls.DOCTOR}/sendEmail`, { "message": "Hi this is message", "to": "toemail@ghjgkg.com" }).subscribe((res: any) => {
      console.log(res);
    })
  }
  /*----------------- PATIENT LIST ------------------------------------*/
  patlc = "not-active";
  patList() {
    this.patlist = true;
    this.addpat = false;
    this.appoint = false;
    this.appointc = "not-active";
    // this.addpc = "not-active"
    this.patlc = "active";
    this.http.get(`${Urls.PATIENT}?filter[where][email]=${this.ActiveUser.email}`).subscribe((res: any) => {
      this.patientList = res;
      console.log(this.patientList)
      this.http.get(`${Urls.PATIENT}/${this.patientList[0]?.id}/appointments?filter[order]=appointmentDate DESC`).subscribe((res: any) => {
        console.log("Appointments", res)
        this.appointmentList = res;
      })
    })
  }

  /*------------------------------------ Appointments---------------------------------------*/
  appointc = "not-active";
  appointments() {
    console.log("Hi");
    this.patlist = false;
    this.addpat = false;
    this.appoint = true;
    // this.addpc = "not-active"
    this.patlc = "not-active";
    this.appointc = "active";
  }
  /*------------------------------------------------------*/

  /*-----------------------Adding Patient-----------------------------------*/
  addpc = true;
  addPat() {
    console.log("add Patient");
    this.patlist = false;
    this.addpat = true;
    this.appoint = false;
    this.addpc = false;
    this.appointc = "not-active";
    this.patlc = "not-active";
    // this.addpc = "active"
    this.http.get(`${Urls.GAME}`).subscribe((res: any) => {
      console.log(res);
      this.gameList = res;
      this.gameList.gameName = res.gameName;
      this.gameList.id = res.id;
    })
  }
  /*-------------------------------------------------------------------------*/
  /*-----------------------Get Doctor list-----------------------------------*/

  getDoc() {
    this.http.get(`${Urls.DOCTOR}`).subscribe((res: any) => {
      console.log(res);
      this.doctorList = res;
      this.doctorList.doctorName = res.doctorName;
      this.doctorList.id = res.id;
      this.selecteddoctor = this.doctorList[0]
    })
  }
  /************************************************************* */
  selection;
  statusClass = 'not-active';
  clickFunction(e, t, i) {

    console.log(e, t, i);
    this.selection = t;
    this.statusClass = "active";
  }

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

  /*----------------------------------------------*/
  onLogout() {
    this.authService.logout(this.user);
  }
  callIndivid(ev) {
    console.log(ev, "Clicked");
    this.http.get(`${Urls.PATIENT}/${ev}`).subscribe((res: any) => {
      console.log(res)
      this.selpat.patientName = res.patientName;
      this.selpat.age = res.age;
      this.indClick = true;
    })

  }
  doRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);

  }
  Close() {
    this.indClick = false;
  }
  edit(d, i) {
    console.log(d, i)
  }
  ionViewWillEnter() {
    this.appointmentDateView = [];
    for (var x = 0; x < 7; x++) {
      this.date = new Date();
      console.log(x)
      // this.appointmentDateView.push(this.datePipe.transform(this.date.setDate(this.date.getDate() + x), "dd"));
      this.appointmentDateView.push(this.datePipe.transform(this.date.setDate(this.date.getDate() + (x)), "yyyy-MM-dd"));
    }
    this.ngOnInit()
  }
  calcStartEndTime(d) {
    var cc = Array.from(document.getElementsByClassName('chdt') as HTMLCollectionOf<HTMLElement>)
    // cc[i].style.backgroundColor = '';
    console.log(cc.length, cc)
    if (cc.length > 0) {
      for (var x = 0; x < cc.length; x++) {
        cc[x].style.backgroundColor = '';
        cc[x].style.color = '';

      }
    }
    console.log(d)
    var y = this.datePipe.transform(d.detail.value, "yyyy-MM-dd")
    console.log(x)
    this.td = y;
    // this.getAppointment();
  }
  i: any;
  changeDate(event, e, i) {
    this.td = e;
    // this.getAppointment();
    this.i = i;
    console.log(event, e, i);
    setTimeout(() => {
      var cc = Array.from(document.getElementsByClassName('chdt') as HTMLCollectionOf<HTMLElement>)
      // cc[i].style.backgroundColor = '';
      console.log(cc.length, cc)
      if (cc.length > 0) {
        for (var x = 0; x < cc.length; x++) {
          cc[x].style.backgroundColor = '';
          cc[x].style.color = '';

        }
        if (event == "event")
          i = i - 1;
        var cx = document.getElementById(i);
        cx.style.backgroundColor = '#000';
        cx.style.color = "#fff";
        console.log(event, e, i, cx, cc, cc[0]);
      }

    }, 50)
  }

  addAppointmentIn(v) {
    v.form.value.appointmentDate = v.form.value.appointmentDate.slice(0, 10);
    console.log(
      v,
      v.form.value,
      this.selecteddoctor,
      v.form.value.selecteddoctor.id
    );
    // this.http
    //   .post(`${Urls.APPOINTMENT}`, {
    //     details: v.form.value.details,
    //     appointmentDate: v.form.value.appointmentDate,
    //     appintmentTime: v.form.value.appintmentTime,
    //     patientListId: this.selpat.id,
    //     doctorListId: this.selecteddoctor.id,
    //     patientName: this.selpat.patientName,
    //     doctorName: this.selecteddoctor.doctorName,
    //     done: false
    //   })
    //   .subscribe((res: any) => {
    //     console.log(res);
    //     this.router.navigate(["/tabs/tab2"]);
    //     this.presentToast(
    //       "Appointment Scheduled",
    //       v.form.value.appointmentDate,
    //       v.form.value.appintmentTime,
    //       "primary"
    //     );
    //   });
  }
  skip() {
    console.log("SKIP");
    this.addpc = true;
  }
}