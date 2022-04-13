import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MediaPageRoutingModule } from './media-routing.module';

import { MediaPage } from './media.page';

import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MediaPageRoutingModule
  ],
  providers: [  
    //here added class to our provider service block  
    FileTransfer,  
    FileTransferObject,  
    File  
],
  declarations: [MediaPage]
})
export class MediaPageModule {}
