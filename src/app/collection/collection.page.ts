import { Component, OnInit, ViewChild } from '@angular/core';

import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, Platform, PopoverController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AstroService, Years } from '../astro.service';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.page.html',
  styleUrls: ['./collection.page.scss'],
})
export class CollectionPage implements OnInit {
  csvData: any[] = [];
  headerRow: any[] = [];
  editing = {};
  rows = [];
  tempData = []
  filteredData: any;
  ColumnMode = ColumnMode;
  cols = [{ name: 'date' }, { name: 'varisaieann' }, { name: 'ththi' }, { name: 'natchathiram' }, { name: "horai" }, { name: 'karanam' }, { name: 'paksham' }, { name: 'yogam' }, { name: 'kilamai' }, { name: 'raasi' }, { name: 'thisai' }, { name: 'sokatiya' }, { name: "lagna" }, { name: "kurippu" }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private file: File,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    public popoverController: PopoverController, private router: Router, private astroService: AstroService, private toastCtrl: ToastController, public actionSheetController: ActionSheetController, public alertController: AlertController) {
    this.astroService.getColabData().subscribe(res => {
      let exportData = []
      res.data.map(res => {
        if (res.isSelected) {
          res.isSelected = "ஆம்";
          exportData.push(res)
        }
      })
      this.filteredData = exportData;
      this.rows = exportData
    })
  }

  ngOnInit() {
  }
  isFilter = false;
  filterValue = "";
  updateFilter(event) {
    if (event.target.value != "") {
      let val = event.target.value;
      this.filterValue = val;
      let colsAmt = this.cols.length;
      let keys = ['date', 'varisaieann', 'ththi', 'natchathiram', "horai", 'karanam', 'paksham', 'yogam', 'kilamai', 'raasi', 'thisai', 'sokatiya', "lagna", "kurippu"]
      this.rows = this.filteredData.filter(function (item) {
        for (let i = 0; i < colsAmt; i++) {
          if (item[keys[i]]) {
            if (item[keys[i]].toString().indexOf(val) !== -1 || !val) {
              return true;
            }
          }
        }
      });
    } else {
      this.rows = this.filteredData
    }
    this.isFilter = true;
    this.table.offset = 0;
  }
  exportCSV(rows) {
    this.astroService.generatePDF({ name: "Colabrated", place: "Place", searchText: "", datas: this.rows }).subscribe(res => {
      this.astroService.updateColabs({ id: "123", data: [] })
      this.showPdf(res.pdf)
    })
  }
  showPdf(base64) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    // const downloadLink = document.createElement("a");
    const fileName = "Colabrated" + new Date().toDateString() + ".pdf";
    this.saveAndOpenPdf(base64, fileName)
    // downloadLink.href = linkSource;
    // downloadLink.download = fileName;
    // downloadLink.click();

  }
  saveAndOpenPdf(pdf: string, filename: string) {
    const writeDirectory = this.platform.is('ios') ? this.file.dataDirectory : this.file.externalDataDirectory;
    console.log(writeDirectory)
    this.file.writeFile(writeDirectory, filename, this.convertBase64ToBlob(pdf, 'data:application/pdf;base64'), { replace: true })
      .then(() => {
        this.share(writeDirectory + filename)//opener.open(writeDirectory + filename, 'application/pdf')
        // .catch(() => {
        //   console.log('Error opening pdf file');
        // });
      })
      .catch(() => {
        console.error('Error writing pdf file');
      });
  }
  convertBase64ToBlob(b64Data, contentType): Blob {
    contentType = contentType || '';
    const sliceSize = 512;
    b64Data = b64Data.replace(/^[^,]+,/, '');
    b64Data = b64Data.replace(/\s/g, '');
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: contentType });
  }
  share(file) {
    var options = {
      message: 'Share File', // not supported on some apps (Facebook, Instagram)
      url: 'https://ionicframework.com/docs/native/social-sharing',
      files: [file]
    };
    this.socialSharing.shareWithOptions(options)
  }
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 4000
    });
    await this.loading.present();
    await this.loading.onDidDismiss();
  }
}
