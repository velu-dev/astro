import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { ColumnMode } from '/public-api';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AstroService } from '../astro.service';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';

import { FileOpener } from '@ionic-native/file-opener/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage implements OnInit {
  csvData: any[] = [];
  headerRow: any[] = [];
  ththi = ["ப்ரதமா",
    "த்விதீயா",
    "த்ருதிய",
    "சதுர்தீ",
    "பஞ்சமீ",
    "ஷஸ்டீ",
    "ஸப்தமீ",
    "அஷ்டமீ",
    "நவமீ",
    "தஷமீ",
    "ஏகாதஷீ",
    "த்வாதஷீ",
    "த்ரயோதஷீ",
    "சதுர்தஷீ",
    "பூர்ணிமா",
    "ப்ரதமா",
    "த்விதீயா",
    "த்ருதிய",
    "சதுர்தீ",
    "பஞ்சமீ",
    "ஷஸ்டீ",
    "ஸப்தமீ",
    "அஷ்டமீ",
    "நவமீ",
    "தஷமீ",
    "ஏகாதஷீ",
    "த்வாதஷீ",
    "த்ரயோதஷீ",
    "சதுர்தஷீ",
    "அமாவஸ்யா"
  ];
  natchathiram = ['அஸ்வினி',
    'பரணி',
    'கார்த்திகை',
    'ரோஹிணி',
    'ம்ருகஷீர்ஷம்',
    'திருவாதிரை',
    'புனர்பூசம்',
    'பூஷம்',
    'ஆயில்யம்',
    'மகம்',
    'பூரம்',
    'உத்திரம்',
    'ஹஸ்தம்',
    'சித்திரை',
    'சுவாதி',
    'விசாகம்',
    'அனுஷம்',
    'கேட்டை',
    'மூலம்',
    'பூராடம்',
    'உத்திராடம்',
    'திருவோணம்',
    'அவிட்டம்',
    'சதயம்',
    'பூரட்டதி',
    'உத்திரட்டாதி',
    'ரேவதி'];
  karanam = ['பவ',
    'பாலவ',
    'கௌலவ',
    'தைதில',
    'கரசை',
    'வணிஜ',
    'விஷ்டி',
    'ஷகுநி',
    'சதுஷ்பாத',
    'நாகவ',
    'கிஸ்துக்ந'];
  paksham = ["வளர்பிறை", "தேய்பிறை"];
  yogam = ['விஷ்கும்பம்',
    'ப்ரீதி',
    'ஆயுஷ்மாந்',
    'ஸௌபாக்ய',
    'ஷோபந',
    'அதிகண்ட',
    'ஸுகர்மா',
    'த்ருதி',
    'ஷூலம்',
    'கண்ட',
    'வ்ருத்தி',
    'த்ருவ',
    'வ்யாகாத',
    'ஹர்ஷண',
    'வஜ்ர',
    'ஸித்தி',
    'வ்யதீபாத',
    'வாரீயந',
    'பரிக',
    'ஷிவ',
    'ஸித்த',
    'ஸாத்ய',
    'ஷுப',
    'ஷுக்ல',
    'ப்ராஹ்ம',
    'ஐந்த்ர',
    'வைத்ருதி']
  kilamai = [
    'ஞாயிறு',
    'திங்கள்',
    'செவ்வாய்',
    'புதன்',
    'வியாழன்',
    'வெள்ளி',
    'சனி']
  raasi = ['மேஷம்',
    'மேஷம்',
    'வ்ருஷப',
    'வ்ருஷப',
    'மிதுந',
    'மிதுந',
    'கடகம்',
    'கடகம்',
    'ஸிம்ஹ',
    'ஸிம்ஹ',
    'கன்னி',
    'கன்னி',
    'துலா',
    'துலா',
    'வ்ருச்சிகம்',
    'வ்ருச்சிகம்',
    'தனுசு',
    'தனுசு',
    'மகர',
    'மகர',
    'கும்ப',
    'கும்ப',
    'மீனம்',
    'மீனம்']
  thisai = ['மேற்கு',
    'கிழக்கு',
    'வடக்கு',
    'வடக்கு',
    'தெற்கு',
    'மேற்கு',
    'கிழக்கு']
  horai = ["சுக்கிரன்", "சாயபுத்ரா", "சூரியன்", "சந்திரன்", "அங்காரகன்", "கணக்கன்", "குரு"]
  sokatiya = ["சல்",
    "கால்",
    "உத்வேக்",
    "அம்ருத்",
    "ரொக",
    "லாப",
    "சுப"]
  lagna = ['மொமேஷ',
    'பிவிரு',
    'டுமிது',
    'மோகட',
    'பிஸிம்',
    'டுகன்',
    'மொதுல',
    'பிவ்ரு',
    'டுதனு',
    'மோமக',
    'பிகும்',
    'டுமீன']
  editing = {};
  rows = [];
  tempData = []
  iiii = "";
  ColumnMode = ColumnMode;
  id: any;
  year: any;
  filteredData: any;
  cols = [{ name: 'date' }, { name: 'varisaieann' }, { name: 'ththi' }, { name: 'natchathiram' }, { name: "horai" }, { name: 'karanam' }, { name: 'paksham' }, { name: 'yogam' }, { name: 'kilamai' }, { name: 'raasi' }, { name: 'thisai' }, { name: 'sokatiya' }, { name: "lagna" }, { name: "kurippu" }];
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(
    private opener: FileOpener, private file: File,
    private platform: Platform,
    private socialSharing: SocialSharing,
    private loadingController: LoadingController,
    private route: ActivatedRoute,
    private astroService: AstroService,
    public alertController: AlertController,
    public toastController: ToastController,
    private http: HttpClient) {
    // this.file.checkDir(this.file.externalRootDirectory, 'Astro').then(response => { }).catch(err => {
    //   console.log('Directory doesn\'t exist' + JSON.stringify(err));
    //   this.file.createDir(this.file.externalRootDirectory, 'Astro', false).then(response => {
    //     console.log('Directory create' + response);
    //   }).catch(err => {
    //     console.log('Directory no create' + JSON.stringify(err));
    //   });
    // })
    //   .then(filePath => console.log(filePath))
    //   .catch(err => console.log(err));
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.getDate();
    })
  }
  ngOnInit() {

  }
  // addRow(index) {
  //   this.presentAlertPrompt();
  // }
  async presentAlertPrompt(index) {
    console.log(index)
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Create New date!',
      inputs: [
        {
          name: 'date',
          type: 'date'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            if (data.date) {
              let data1: any = [];
              let i = 0;
              this.rows.map((row: any) => {
                data1.push(row)
                if (i == index) {
                  let dd = String(new Date(data.date).getDate()) + "/" + String(new Date(data.date).getMonth() + 1) + "/" + String(new Date(data.date).getFullYear())
                  data1.push({
                    date: dd,
                    horai: "Please Enter",
                    isSelected: false,
                    karanam: "Please Enter",
                    kilamai: "Please Enter",
                    lagna: "Please Enter",
                    natchathiram: "Please Enter",
                    paksham: "Please Enter",
                    raasi: "Please Enter",
                    sokatiya: "Please Enter",
                    thisai: "Please Enter",
                    ththi: "Please Enter",
                    varisaieann: "Please Enter",
                    yogam: "Please Enter"
                  })
                }
                i = i + 1;
              })
              this.rows = data1;
              this.originalData = data1;
            } else {
              this.presentToast("Please Select Date");
            }
          }
        }]
    })
    await alert.present();
  }
  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }
  colabdata: any = [];
  originalData: any;
  getDate() {
    this.astroService.getColabData().subscribe(res => {
      if (res) {
        this.colabdata = res.data;
        console.log(res)
      }
    }, error => {
      console.log(error)
    })
    this.astroService.getYear(this.id).subscribe(res => {
      this.year = res.year;
      this.tempData = [...res.data]
      this.rows = res.data;
      this.originalData = res.data;
      this.filteredData = res.data;
    })
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
  updateFilter1(event) {
    if (event.target.value != "") {
      let val = event.target.value;
      this.filterValue = val;
      let colsAmt = this.cols.length;
      let keys = ['date', 'varisaieann', 'ththi', 'natchathiram', "horai", 'karanam', 'paksham', 'yogam', 'kilamai', 'raasi', 'thisai', 'sokatiya', "lagna", "kurippu"]
      this.rows = this.rows.filter(function (item) {
        for (let i = 0; i < colsAmt; i++) {
          if (item[keys[i]]) {
            if (item[keys[i]].toString().indexOf(val) !== -1 || !val) {
              return true;
            }
          }
        }
      });
    } else {
      this.rows = this.rows
    }
  }
  loadingPresent = false;
  async activeLoader() {
    this.loadingPresent = true;
    const loading = await this.loadingController.create({
      message: 'Please Wait...',
    });
    return await loading.present();
  }
  async dismissLoading() {
    if (this.loadingPresent) {
      await this.loadingController.dismiss();
    }
    this.loadingPresent = false;
  }
  isSelected: any;
  isSubmit = false;
  updateValue(event, cell, rowIndex) {
    this.activeLoader();
    // let i = 0;
    // this.rows.map((row: any) => {
    //   if (!row.kurippu) {
    //     this.rows[i]['kurippu'] = "";
    //   }
    //   if (row.kurippu == undefined) {
    //     this.rows[i]['kurippu'] = "";
    //   }
    //   i = i + 1;
    // })
    // let data = { id: this.id, year: this.year, data: this.rows }
    // this.astroService.updateYear(data)
    if (!this.isFilter) {
      let value: any;
      if (event == true || event == false) {
        value = event ? false : true;
      } else {
        if (event.target) {
          value = event.target.value;
          if (cell != "varisaieann")
            this.reorder(rowIndex, cell, value);
        }
      }
      this.editing[rowIndex + '-' + cell] = false;
      this.originalData[rowIndex][cell] = value;
      console.log(value)
      this.originalData = [...this.originalData];
      let data = { id: this.id, year: this.year, data: this.originalData }
      console.log(data)
      this.astroService.updateYear(data).then(res => {
        this.dismissLoading();
      }).catch(error => {
        console.log(error)
      })
      this.getDate();
    }
  }
  reorder(index, col, value) {
    let reorderData = []
    let valueIndex: any;
    if (col == "natchathiram") {
      reorderData = this.natchathiram;
    }
    if (col == "horai") {
      reorderData = this.horai;
    }
    if (col == "kilamai") {
      reorderData = this.kilamai;
    }
    if (col == "thisai") {
      reorderData = this.thisai
    }
    if (col == "raasi") {
      reorderData = this.raasi
    }
    if (col == "kilamai") {
      reorderData = this.kilamai
    }
    if (col == "yogam") {
      reorderData = this.yogam
    }
    if (col == "paksham") {
      reorderData = this.paksham
    }
    if (col == "karanam") {
      reorderData = this.karanam
    }
    if (col == "ththi") {
      reorderData = this.ththi
    }
    if (col == "sokatiya") {
      reorderData = this.sokatiya
    }
    if (col == "lagna") {
      reorderData = this.lagna
    }
    valueIndex = reorderData.indexOf(value)
    let dummyCount = 0;
    let i = 0;
    let count = valueIndex;
    this.rows.map(res => {
      if (i >= index) {
        if (!res.isSelected) {
          if (col == "paksham") {
            this.rows[i][col] = reorderData[count];
            dummyCount = dummyCount + 1;
            if (dummyCount == 15) {
              dummyCount = 0;
              count = count == 0 ? 1 : 0;
            }
          } else if (col == "lagna") {
            this.rows[i][col] = reorderData[count];
            dummyCount = dummyCount + 1;
            if (dummyCount == 45) {
              dummyCount = 0;
              if (count == 11) {
                count = 0;
              } else {
                count = count + 1
              }
            }
          } else {
            this.rows[i][col] = reorderData[count];
            count = count + 1;
            if (count == (reorderData.length)) {
              count = 0;
            }
          }
        }
      }
      i = i + 1;
    })
  }
  exportCSV(data) {
    let exportData = []
    this.rows.map(res => {
      if (res.isSelected) {
        res.isSelected = "ஆம்";
        exportData.push(res)
      }
    })
    this.presentLoading();
    this.astroService.generatePDF({ name: this.year, place: "dsfdsf", searchText: this.filterValue, datas: exportData }).subscribe(res => {
      this.showPdf(res.pdf)
    })
  }
  showPdf(base64) {
    const linkSource = 'data:application/pdf;base64,' + base64;
    // const downloadLink = document.createElement("a");
    const fileName = this.year + ".pdf";
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
  loading: any;
  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Please wait',
      duration: 4000
    });
    await this.loading.present();
    await this.loading.onDidDismiss();
  }
  numberOnly(event) {
    const pattern = /[0-9.,]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // invalid character, prevent input
      event.preventDefault();
    }
  }
  share(file) {
    var options = {
      message: 'Share File', // not supported on some apps (Facebook, Instagram)
      url: 'https://ionicframework.com/docs/native/social-sharing',
      files: [file]
    };
    this.socialSharing.shareWithOptions(options)
  }
  edit(rowIndex, name) {
    console.log("ffdsfsdf", this.rows[rowIndex].isSelected);
    if (!this.rows[rowIndex].isSelected) {
      console.log("ffdsfsdf");
      this.isFilter = false;
      this.editing[rowIndex + '-' + name] = true
    }
  }
  save() {
    let dd: any;
    if (this.colabdata) {
      dd = this.colabdata.concat(this.rows)
    } else {
      dd = this.rows;
    }
    let data = { id: "123", data: dd }
    this.astroService.updateColabs(data).then(res => {
      this.alert();
    }).catch(error => {
      console.log(error)
    })
  }
  async alert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Success',
      message: 'Data updated go to home.',
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }
}
