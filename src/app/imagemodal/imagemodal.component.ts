import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { ToastController } from '@ionic/angular';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-imagemodal',
  templateUrl: './imagemodal.component.html',
  styleUrls: ['./imagemodal.component.scss'],
})
export class ImagemodalComponent implements OnInit {
  modalTitle: string;
  modelValue: number;
  modelRemark: string;

  dataValue: any;
  today = new Date();
  urls = Urls;
  private fileTransfer = this.transfer.create();
  // private fileTransfer: FileTransferObject;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private http: HttpClient,
    private modalController: ModalController,
    public navParams: NavParams,
    private transfer: FileTransfer, private file: File
  ) { }
  images: any;
  ngOnInit() {
    this.dataValue = {
      "name": this.navParams.data,
      "value": this.navParams.data.imageindex
    }
    this.modelValue = null;
    console.log(this.dataValue)
    // this.ionViewWillEnter()
  }

  public download(fileName) {
    // //here encoding path as encodeURI() format.  
    // let url = encodeURI('http://134.209.155.253/api/files/images/download/');
    // //here initializing object.  
    // this.fileTransfer = this.transfer.create();
    // // here iam mentioned this line this.file.externalRootDirectory is a native pre-defined file path storage. You can change a file path whatever pre-defined method.  
    // this.fileTransfer.download(url, this.file.externalRootDirectory + fileName, true).then((entry) => {
    //   //here logging our success downloaded file path in mobile.  
    //   console.log('download completed: ' + entry.toURL());
    // }, (error) => {
    //   //here logging our error its easier to find out what type of error occured.
    //   console.log('download failed: ' + error);
    // });
    console.log(fileName);
    let url = encodeURI(`${Urls.FILES}/images/download/` + fileName);
    console.log(url)
    this.fileTransfer.download(url, this.file.dataDirectory + fileName).then((entry) => {
      console.log('download complete: ' + entry.toURL());
    }, (error) => {
      // handle error
      console.log(error)
    });
  }

  async closeModal() {
    // this.dataValue[this.navParams.data.name] = this.modelValue;
    this.dataValue.value = this.modelValue;
    console.table(this.navParams.data);
    const onClosedData: Object = this.dataValue;
    await this.modalController.dismiss(onClosedData);
  }

  async closeModalNodata() {
    await this.modalController.dismiss();
  }

  ionViewWillEnter() {
    this.http.get(`${Urls.FILES}/images/files`).subscribe(res => {
      console.log(res);
      this.images = res[this.dataValue.value];
      console.log(res[this.dataValue.value], res)
    })
  }

  deleteFile(fn) {
    this.http.delete(`${Urls.FILES}/images/files/` + fn).subscribe(res => {
      console.log(res)
      // this.selecteImage = null;
      this.closeModalNodata()
      this.presentToast('Image deleted', 'danger', '200')
    }, err => {
      console.log(err)
    })
  }
  async presentToast(d, c, t) {
    const toast = await this.toastController.create({
      message: d,
      duration: t,
      position: 'top',
      cssClass: 'normalToast',
      color: c
    });
    toast.present();
  }

  async presentAlert(img) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure you want to delete?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            this.closeModalNodata();
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deleteFile(img);
          }
        }
      ]
    });
    await alert.present();
  }

}