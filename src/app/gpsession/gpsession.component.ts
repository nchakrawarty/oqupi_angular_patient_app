import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ModalController, NavParams } from "@ionic/angular";
import { Urls } from "../constants/urls";

@Component({
  selector: "app-gpsession",
  templateUrl: "./gpsession.component.html",
  styleUrls: ["./gpsession.component.scss"],
})
export class GpsessionComponent implements OnInit {
  modalTitle: string;
  modelValue: number;
  modelRemark: string;
  dataValue: any;
  today = new Date();
  show: boolean;
  showIndex: number = null;
  prescribedGameId: any;
  sessionDetails: any;
  allsessions: any = [
    {
      name: "Session 1",
    },
    {
      name: "Session 2",
    },
    {
      name: "Session 3",
    },
  ];

  constructor(
    private modalController: ModalController,
    public navParams: NavParams,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.show = false;
    console.log(this.navParams);
    this.modalTitle = this.navParams?.data?.gameName;
    this.getSessionDetails();
  }
  getSessionDetails() {
    this.http.get(`${Urls.PRESCRIBEDGAME}/${this.navParams?.data.id}/sessionDetails`).subscribe(res => {
      console.log(res)
      this.sessionDetails = res;
    })
  }
  async closeModal() {
    // this.dataValue[this.navParams.data.name] = this.modelValue;
    this.dataValue.value = this.modelValue;
    // console.table(this.navParams.data);
    const onClosedData: Object = this.dataValue;
    await this.modalController.dismiss(onClosedData);
  }

  async closeModalNodata() {
    await this.modalController.dismiss();
  }
}
