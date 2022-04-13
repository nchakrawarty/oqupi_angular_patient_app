import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { Urls } from '../constants/urls';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  doctorList: any;
  gameList: any;
  selectedgame: any;
  selecteddoctor: any;
  selectedrole: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    this.doctorList = {
      doctorName: "",
      id: ""
    }
    this.gameList = {
      gameName: "",
      id: ""
    }
  }


  ngOnInit() {
    this.http.get(`${Urls.DOCTOR}`).subscribe((res: any) => {
      console.log(res);
      this.doctorList = res;
      this.doctorList.doctorName = res.doctorName;
      this.doctorList.id = res.id;
    })

    this.http.get(`${Urls.GAME}`).subscribe((res: any) => {
      console.log(res);
      this.gameList = res;
      this.gameList.gameName = res.doctorName;
      this.gameList.id = res.id;
    })
  }
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
      "v.form.value.appointmentDate",
      " v.form.value.selecteddoctor"
    )
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
}
