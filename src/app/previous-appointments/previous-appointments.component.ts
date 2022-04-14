import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-previous-appointments",
  templateUrl: "./previous-appointments.component.html",
  styleUrls: ["./previous-appointments.component.scss"],
})
export class PreviousAppointmentsComponent implements OnInit {
  appointmentList: any = [
    {
      name: "Dr. Ravi",
    },
    {
      name: "Dr. Mehra",
    },
    {
      name: "Dr. John Doe",
    },
    {
      name: "Dr. Chelsi",
    },
    {
      name: "Dr. B.P Jack",
    },
  ];
  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async closeModalNodata() {
    await this.modalController.dismiss();
  }
}
