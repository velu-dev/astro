import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FileOpener } from '@ionic-native/file-opener';
import { File } from '@ionic-native/file';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule { }
