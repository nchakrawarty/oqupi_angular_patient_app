import { Component, OnInit, Output } from '@angular/core';
import { Capacitor, Plugins, CameraResultType, CameraSource, FilesystemDirectory } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EventEmitter } from 'protractor';
import { Urls } from './../constants/urls';
import { AuthService } from '../auth.service';
import { ToastController } from '@ionic/angular';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}


@Component({
  selector: 'app-camera',
  templateUrl: './camera.page.html',
  styleUrls: ['./camera.page.scss'],
})
export class CameraPage implements OnInit {
  image: SafeResourceUrl;
  selecteImage: any;
  imagePick: any;
  generatedImage: any;
  finalimageFile: any;
  storage;
  id: string;
  token: string;
  formDataToUpload: any;
  constructor(public toastController: ToastController, private authService: AuthService, private domSanitizer: DomSanitizer, public http: HttpClient) { }
  ngOnInit() {
    this.storage = JSON.parse(localStorage.getItem("currentUser"));
    // var y = JSON.parse(x);
    console.log(this.storage);
    this.id = this.storage.userId;
    this.token = this.storage.id;
  }
  async takephoto() {
    const { Camera } = Plugins;

    // const result = await Camera.getPhoto({
    //   quality: 100,
    //   allowEditing: true,
    //   source: CameraSource.Camera,
    //   resultType: CameraResultType.Base64
    // }).then(im => {
    //   this.selecteImage = im.base64String;
    //   this.imagePick.EventEmitter(this.selecteImage);
    //   this.onImagePicked(this.selecteImage)
    // }).catch(err => {
    //   console.log(err)
    // })

    const result = await Camera.getPhoto({
      quality: 30,
      allowEditing: true,
      source: CameraSource.Camera,
      resultType: CameraResultType.DataUrl
    }).then(im => {
      this.selecteImage = im.dataUrl;
      // this.imagePick.EventEmitter(im.dataUrl);
      this.onImagePicked(this.selecteImage)
    }).catch(err => {
      console.log(err)
    })
  }

  processFile(event: Event) {
    const pickedFile = (event.target as HTMLInputElement).files[0];
    this.selecteImage = pickedFile;
    this.onImagePicked(pickedFile)
    if (!pickedFile) {
      return
    }
    const fr = new FileReader();
    fr.onload = () => {
      const du = fr.result.toString();
      this.selecteImage = du;
      // this.onImagePicked(this.selecteImage)
    }
    fr.readAsDataURL(pickedFile)
    console.log(fr, pickedFile)
  }

  onImagePicked(imageData: string | File) {
    let imageFile;
    // console.log(imageData)
    if (typeof imageData == 'string') {
      console.log(imageData)
      try {
        imageFile = base64toBlob(imageData.replace('data:image/jpeg;base64,', ''), 'image/jpeg')
        const imageName: string = this.generateName();
        // this.finalimageFile = new File([imageFile], imageName, {
        //   type: "image/jpeg"
        // });
        this.formDataToUpload = new FormData();
        this.formDataToUpload.append("files", imageFile, imageName);
        console.log(imageFile, this.formDataToUpload)
      } catch (err) {
        console.log("Error", err)
      }

    } else {
      imageFile = imageData;
      const ina: string = this.generateName();
      this.formDataToUpload = new FormData();
      this.formDataToUpload.append("files", imageFile, ina);
      this.finalimageFile = new File([imageFile], ina, {
        type: "image/jpeg"
      });
    }
    // this.generatedImage = window.URL.createObjectURL(this.finalimageFile);
    // window.open(this.generatedImage)
    // console.log(this.generatedImage)
    // let headers = new HttpHeaders({
    //   'Authorization': this.token,
    //   'content-type': "multipart/form-data"
    // });
    // let options = { headers: headers }
  }
  uploadFile() {
    this.http.post<{ imageUrl: string, imagePath: string }>(`${Urls.FILES}/images/upload`, this.formDataToUpload).subscribe(res => {
      console.log(res)
      this.selecteImage = null;
      this.presentToast('Image Uploaded', 'success', '200')

    }, err => {
      console.log(err)
    })
  }

  onSelectImage(ev) {
    console.log(ev.target)
    this.presentToast('Some error occured', 'danger', '200')

  }

  generateName(): string {
    const date: number = new Date().valueOf();
    let text: string = "";
    const possibleText: string =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possibleText.charAt(
        Math.floor(Math.random() * possibleText.length)
      );
    }
    console.log(date + "." + text + ".jpeg")
    return date + text + ".jpeg";
  }
  deletephoto() {
    this.selecteImage = null;
    this.presentToast('Image removed', 'danger', '200')

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
  onLogout() {
    this.authService.logout(this.storage);
  }

}
