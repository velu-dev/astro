import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ArraySortPipe, ListPage } from './list.page';

import { ListPageRoutingModule } from './list-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    NgxDatatableModule
  ],
  declarations: [ListPage, ArraySortPipe]
})
export class ListPageModule { }
