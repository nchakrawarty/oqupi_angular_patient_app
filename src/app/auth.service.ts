import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Urls } from './constants/urls';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  oldCv: any;
  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    // console.log(email, password)
    return this.http.post<any>(`${Urls.LOGIN}`, { email, password, returnSecureToken: true })
      .pipe(map(user => {
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.http.get(`${Urls.USERS}/${user.userId}?access_token=${user.id}`).subscribe(res => {
          let data: any = res;
          console.log(res);
          localStorage.setItem("userName", data.username);
        });
        // console.log(user);
        // login successful if there's a jwt token in the response
        if (user && user.id) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        this.router.navigate(['/tabs']);
        return user;
      }));
  }
  logout(u) {
    // this.http.get('/logout', function (req, res, next) {
    //   if (!req.accessToken) return res.sendStatus(401); //return 401:unauthorized if accessToken is not present
    //   User.logout(req.accessToken.id, function (err) {
    //     if (err) return next(err);
    //     res.redirect('/'); //on successful logout, redirect
    //   });
    // });
    this.http.post<any>(`${Urls.LOGOUT}?access_token=${u.id}`, { "accessToken": u.id }).subscribe((res: any) => {
      console.log(res);
      console.log("Logged out");
    })
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    this.router.navigate(['/login']);
  }

  register(fname: string,
    lname: string,
    mobile: number,
    email: string,
    username: string,
    age: number,
    gender: string,
    bloodgroup: string,
    password: string,
    role: string,
    appointmentDate: string,
    selecteddoctor: string) {
    console.log(email, role, password, age, gender, username, bloodgroup, mobile);
    // let centerId = '';
    // if (role === 'doctor') {
    //   centerId = localStorage.getItem('selectedCenterId');
    // }
    // else {
    //   centerId = centers[0];
    // }
    // console.log(centerId);

    return this.http.post<any>(`${Urls.ACCOUNT}`, {
      firstName: fname,
      lastName: lname,
      email: email,
      mobile: mobile,
      boloodgroup: bloodgroup,
      password: password,
      age: age,
      gender: gender,
      username: username,
      role: role,
      emailverified: true
    })
      .pipe(map(user => {
        // let userName = {
        //   "name": user.username,
        //   "id": user.id
        // }
        if (role == 'doctor') {
          this.http.post<any>(`${Urls.DOCTOR}`, {
            emailId: user.email,
            contactNum: user.mobile,
            boloodgroup: user.bloodgroup,
            userid: user.id,
            age: user.age,
            gender: user.gender,
            doctorName: user.firstName + " " + user.lastName,
            username: user.username,
            role: user.role,
          }).pipe(map(users => { })).subscribe(datas => {
            console.log(datas);
          });
          this.router.navigate(['/login']);
        }
        if (role == 'patient') {
          this.http.post<any>(`${Urls.DOCTOR}/${selecteddoctor}/patientLists`, {
            email: user.email,
            contactNum: user.mobile,
            boloodgroup: user.bloodgroup,
            userid: user.id,
            age: user.age,
            gender: user.gender,
            patientName: user.username,
            role: user.role,
            appointmentDate: appointmentDate
          }).pipe(map(users => { })).subscribe(datas => {
            console.log(datas);
          });
          this.router.navigate(['/tab3']);
        }

        // for (let c = 0; c < user.centers.length; c++) {
        //   // this.http.get(`${Urls.CENTERS}/${user.centers[c]}`).subscribe(res => {
        //   //   this.oldCv = res;
        //   //   this.oldCv.userName.push(userName);
        //   //   delete this.oldCv.id;
        //   //   this.http.patch(`${Urls.CENTERS}/${user.centers[c]}`, this.oldCv).subscribe(res => {
        //   //     console.log("user inserted into center", res)
        //   //     this.router.navigate(['/login']);
        //   //   })
        //   // })
        // }
      }));

  }
}
