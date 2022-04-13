import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ImagemodalComponent } from "./imagemodal/imagemodal.component";
import { AuthGuard } from "./guard/auth.guard";
import { NoauthGuard } from "./guard/noauth.guard";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from "@ionic-native/file-transfer/ngx";
import { DatePipe } from "@angular/common";
import { File } from "@ionic-native/file/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { AddcenterPipe } from "./addcenter.pipe";
import { TimePipe } from "./pipes/time.pipe";
import { NativePageTransitions } from "@ionic-native/native-page-transitions/ngx";
import { GpsessionComponent } from "./gpsession/gpsession.component";

@NgModule({
  declarations: [
    AppComponent,
    ImagemodalComponent,
    AddcenterPipe,
    TimePipe,
    GpsessionComponent,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    FileTransfer,
    DatePipe,
    File,
    Camera,
    AuthGuard,
    NoauthGuard,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    NativePageTransitions,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
