import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { LoadingController, ToastController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions/ngx';

import {
  ApexAxisChartSeries,
  ApexTitleSubtitle,
  ApexChart,
  ApexXAxis,
  ApexYAxis,
  ApexFill,
  ChartComponent,
  ApexStroke,
  ApexMarkers,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexDataLabels,
  ApexLegend,
  ApexPlotOptions
} from "ng-apexcharts";
import { stringify } from '@angular/compiler/src/util';
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  fill: ApexFill;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
};
export type ChartOptionh = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  fill: ApexFill;
  plotOptions: ApexPlotOptions;
};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  fill: ApexFill;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {
  flag = false;
  user: any;
  loggedInUser: string;

  constructor(
    private datePipe: DatePipe,
    private authService: AuthService,
    private http: HttpClient, private router: Router,
    private loadingCtrl: LoadingController,
    private nativePageTransitions: NativePageTransitions,
    public toastController: ToastController,
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
    this.patientList = {}

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
  colors = [];
  selectedSession: any;
  sessionLength: number;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionh: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  selectedSessionid: any;
  ActiveUser: any;
  today = Date.now();
  gamesPrescribed = [];
  appointmentDateView = [];
  gtx: any;
  td: any;
  date: Date;
  ngOnInit() {
    console.log(this.appointmentDateView)
    this.td = this.datePipe.transform(this.today, "yyyy-MM-dd");
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
      this.ActiveUser.email = res.email;
      /*----------------- PATIENT LIST ------------------------------------*/
      this.http.get(`${Urls.PATIENT}?filter[where][email]=${this.ActiveUser.email}`).subscribe((res: object) => {
        console.log(res)
        this.patientList = res[0];
        console.log(this.patientList.id)
        this.callprescribed()
      })

    })


    /*----------------- Session LIST ------------------------------------*/

    // this.http.get(`${Urls.SESSIONS}`).subscribe((res: any) => {
    //   console.log(res);
    //   this.session = res;
    //   this.sessionLength = res.length;
    //   this.selectedSession = res[res.length - 1];
    //   this.selectedSessionid = res[res.length - 1].id;
    //   this.id = res.id;
    //   // this.callSession(this.selectedSessionid);
    //   /*--------------------------------Game value---------------------- */

    //   // this.maxNegXValue = parseFloat(this.selectedSession.maxNegXValue).toFixed(2);
    //   // this.maxNegYValue = parseFloat(this.selectedSession.maxNegYValue).toFixed(2);
    //   // this.maxPosXValue = parseFloat(this.selectedSession.maxPosXValue).toFixed(2);
    //   // this.maxPosYValue = parseFloat(this.selectedSession.maxPosYValue).toFixed(2);

    //   /*-------------------------------- END ---------------------------------------*/


    //   /*--------------------------------Examination value---------------------- */

    //   this.examRoomMaxNegXValue = parseFloat(this.selectedSession.examRoomMaxNegXValue).toFixed(2);
    //   this.examRoomMaxNegYValue = parseFloat(this.selectedSession.examRoomMaxNegYValue).toFixed(2);
    //   this.examRoomMaxPosXValue = parseFloat(this.selectedSession.examRoomMaxPosXValue).toFixed(2);
    //   this.examRoomMaxPosYValue = parseFloat(this.selectedSession.examRoomMaxPosYValue).toFixed(2);

    //   /*-------------------------------- END ---------------------------------------*/
    //   this.sessionDateTime = this.selectedSession.sessionDateTime;
    //   this.sessionNumber = this.selectedSession.sessionNumber;
    //   this.rotationChange();
    //   console.log(this.selectedSession)


    // })
  }
  colorSVG() {
    var c = [];
    this.gamesPrescribed.forEach(game => {
      c.push(game.gameType)
    })
    console.log(c)
    c.forEach(a => {
      console.log(a)
      if (a == 'neck') {
        this.gtx = Array.from(document.getElementsByClassName(a) as HTMLCollectionOf<HTMLElement>);
        console.log(this.gtx)
        this.gtx.forEach(s => {
          console.log(s)
          s.style.fill = "red";
        });
      } else if (a == 'shoulder') {
        this.gtx = Array.from(document.getElementsByClassName(a) as HTMLCollectionOf<HTMLElement>);
        console.log(this.gtx)
        this.gtx.forEach(s => {
          console.log(s)
          s.style.fill = "red";
        });
      } else if (a == 'leg') {
        this.gtx = Array.from(document.getElementsByClassName('knee') as HTMLCollectionOf<HTMLElement>);
        console.log(this.gtx)
        this.gtx.forEach(s => {
          console.log(s)
          s.style.fill = "red";
        });
      }
    })

  }

  callprescribed() {
    if (this.patientList.id) {
      this.http.get(`${Urls.PATIENT}/${this.patientList.id}/gamesPrescribeds?filter[order]=prescribedOn DESC`).subscribe((res: any) => {
        this.gamesPrescribed = res;
        console.log(res)
        this.colorSVG()
      })
    }
  }

  rotationChange() {
    for (var i = 0; i < this.rotation.length; i++) {
      console.log(i)
      if (i == 0) {
        this.rotation[i].val = this.maxNegXValue;
        this.rotation[i].date = this.session.sessionDateTime;

      } else if (i == 1) {
        this.rotation[i].date = this.session.sessionDateTime;
        this.rotation[i].val = this.maxPosXValue;

      } else if (i == 2) {
        this.rotation[i].date = this.session.sessionDateTime;
        this.rotation[i].val = this.maxNegYValue;

      } else {
        this.rotation[i].date = this.session.sessionDateTime;
        this.rotation[i].val = this.maxPosYValue;

      }
    }
  }

  onChange(s) {
    console.log(s)
    this.callSession(s);
  }
  async callSession(s) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading data'
    });
    this.http.get(`${Urls.SESSIONS + "/" + s}`).subscribe(async (res: any) => {
      console.log(res);
      this.id = res.id;
      this.selectedSession = res;
      this.maxNegXValue = parseFloat(res.maxNegXValue).toFixed(2);
      this.maxNegYValue = parseFloat(res.maxNegYValue).toFixed(2);
      this.maxPosXValue = parseFloat(res.maxPosXValue).toFixed(2);
      this.maxPosYValue = parseFloat(res.maxPosYValue).toFixed(2);
      this.sessionDateTime = res.sessionDateTime;
      this.sessionNumber = res.sessionNumber;
      this.totalTimeSpent = (this.selectedSession.heatMapPosY.length + this.selectedSession.heatMapPosX.length + this.selectedSession.heatMapNegY.length + this.selectedSession.heatMapNegX.length);
      this.upTime = this.selectedSession.heatMapPosY.length;
      this.downTime = this.selectedSession.heatMapNegY.length;
      this.leftTime = this.selectedSession.heatMapNegX.length;
      this.rightTime = this.selectedSession.heatMapPosX.length;
      loading.dismiss();
      this.rotationChange();
    })
    loading.present();
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
    // this.ngOnInit()
    // this.chartOptions = {
    //   series: [70],

    //   chart: {
    //     height: 150,
    //     type: "radialBar",
    //     foreColor: 'red'
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: "60%",
    //         background: '',
    //       },
    //       track: {
    //         show: true,
    //         startAngle: undefined,
    //         endAngle: undefined,
    //         background: '#f2f2f2',
    //         strokeWidth: '97%',
    //         opacity: 1,
    //         margin: 5,
    //         dropShadow: {
    //           enabled: false,
    //           top: 0,
    //           left: 0,
    //           blur: 3,
    //           opacity: 0.5
    //         }
    //       },
    //       dataLabels: {
    //         show: true,
    //         name: {
    //           show: true,
    //           fontSize: '16px',
    //           fontFamily: undefined,
    //           fontWeight: 600,
    //           color: undefined,
    //           offsetY: 10
    //         },
    //         // value: {
    //         //   show: true,
    //         //   fontSize: '14px',
    //         //   fontFamily: undefined,
    //         //   fontWeight: 400,
    //         //   color: undefined,
    //         //   offsetY: 16,
    //         //   formatter: function (val) {
    //         //     return val + '%'
    //         //   }
    //         // },
    //         // total: {
    //         //   show: false,
    //         //   label: 'Total',
    //         //   color: '#373d3f',
    //         //   fontSize: '16px',
    //         //   fontFamily: undefined,
    //         //   fontWeight: 600,
    //         //   formatter: function (w) {
    //         //     return w.globals.seriesTotals.reduce((a, b) => {
    //         //       return a + b
    //         //     }, 0) / w.globals.series.length + '%'
    //         //   }
    //         // }
    //       }
    //     },
    //   },
    //   labels: [""]
    // };
    // this.chartOptionh = {
    //   series: [50],
    //   chart: {
    //     height: 150,
    //     type: "radialBar"
    //   },
    //   plotOptions: {
    //     radialBar: {
    //       hollow: {
    //         size: "70"
    //       }
    //     }
    //   },
    //   labels: [""]
    // };
    this.appointmentDateView = [];
    for (var x = 0; x < 7; x++) {
      this.date = new Date();
      console.log(x)
      // this.appointmentDateView.push(this.datePipe.transform(this.date.setDate(this.date.getDate() + x), "dd"));
      this.appointmentDateView.push(this.datePipe.transform(this.date.setDate(this.date.getDate() + (x)), "yyyy-MM-dd"));
    }
    this.ngOnInit()
  }
  ionViewWillLeave() {
    // let options: NativeTransitionOptions = {
    //   direction: 'up',
    //   duration: 500,
    //   slowdownfactor: 3,
    //   slidePixels: 20,
    //   iosdelay: 100,
    //   androiddelay: 150,
    //   fixedPixelsTop: 0,
    //   fixedPixelsBottom: 60
    // }

    // this.nativePageTransitions.slide(options)
    //   .then(onSuccess)
    //   .catch(onError);
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
      // event.target.attributes.style.nodeValue ;
      // this.appointmentOn = e;
      // this.http.get(`${Urls.APPOINTMENT}?filter[where][and][0][doctorListId]=${this.doctor[0].id}&filter[where][and][1][appointmentDate]=${e}`).subscribe((res) => {
      //   console.log(res)
      //   this.tdAppointment = res;

      // })
    }, 50)
    // console.log(e, e['detail'], e.detail.value.toString().slice(0, 10))
    // this.http.get(`${Urls.APPOINTMENT}?filter[where][and][0][appointmentDate]=${e.detail.value.toString().slice(0, 10)}&filter[where][and][0][doctorListId]=${this.doctor[0].id}`).subscribe((res: any) => {
    //   console.log("Appointment", res)
    //   this.tdAppointment = res;
    // })
  }
}
