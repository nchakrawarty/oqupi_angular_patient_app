import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

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
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async closeModalNodata() {
    await this.modalController.dismiss();
  }
}
