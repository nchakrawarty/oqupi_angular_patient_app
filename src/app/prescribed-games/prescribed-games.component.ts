import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';

@Component({
  selector: "app-prescribed-games",
  templateUrl: "./prescribed-games.component.html",
  styleUrls: ["./prescribed-games.component.scss"],
})
export class PrescribedGamesComponent implements OnInit {
  ratings: any = [
    { name: "General" },
    { name: "Standard" },
    { name: "Hard" },
  ];
  prescribedGameList: any;
  constructor(private modalController: ModalController,
    private http: HttpClient,
    public navParams: NavParams
  ) {
    console.log(navParams.data[0])
    this.http.get(`${Urls.PATIENT}/${navParams.data[0].id}/gamesPrescribeds`).subscribe(res => {
      console.log(res)
      this.prescribedGameList = res;
    })
  }

  ngOnInit() {

  }

  async closeModalNodata() {
    console.log()
    await this.modalController.dismiss();
  }
}
