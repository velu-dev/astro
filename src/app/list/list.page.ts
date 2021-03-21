import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/compiler/src/util';
import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';
import { ActionSheetController, AlertController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AstroService, Years } from '../astro.service';
// import { ColumnMode } from '/public-api';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss'],
})
export class ListPage {
    private years = [];
    ththi = [
        'அஷ்டமீ',
        'நவமீ',
        'தஷமீ',
        'ஏகாதஷீ',
        'த்வாதஷீ',
        'த்ரயோதஷீ',
        'சதுர்தஷீ',
        'பூர்ணிமா',
        'ப்ரதமா',
        'த்விதீயா',
        'த்ருதிய',
        'சதுர்தீ',
        'பஞ்சமீ',
        'ஷஸ்டீ',
        'ஸப்தமீ',
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
    kilamai = ['ஞாயிறு',
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
    constructor(private router: Router, private astroService: AstroService, private toastCtrl: ToastController, public actionSheetController: ActionSheetController, public alertController: AlertController) {
        this.astroService.getYears().subscribe(res => {
            this.years = res
        })

    }
    nav(year) {
        // let navigationExtras: NavigationExtras = {
        //     queryParams: {
        //         id: JSON.stringify(year.id)
        //     }
        // };
        let navigationExtras: NavigationExtras = { state: { id: year.id } };

        this.router.navigate(['/home', year.id]);
    }
    async presentAlertPrompt() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Create New Sheet!',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Sheet Name'
                },
                // input date without min nor max
                {
                    name: 'year',
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
                        // this.addIdea(data.name + "-" + data.year)
                        let date = this.getDaysInMonth(2012)
                        let i = 1;
                        let ththiCount = 0;
                        let nakchathiraCount = 0;
                        let karanamCount = 0;
                        let pakshamCount = 0;
                        let defaultPaksham = 0
                        let yogamCount = 0;
                        let kilamaiCount = 0;
                        let raasiCount = 0;
                        let thisaiCount = 0;
                        let consolidatedData = []
                        date.map(res => {
                            consolidatedData.push({ "s.no": i, date: res, ththi: this.ththi[ththiCount], natchathiram: this.natchathiram[nakchathiraCount], karanam: this.karanam[karanamCount], paksham: this.paksham[defaultPaksham], yogam: this.yogam[yogamCount], kilamai: this.kilamai[kilamaiCount], raasi: this.raasi[raasiCount], thisai: this.thisai[thisaiCount], isSelected: false });
                            i = i + 1;
                            nakchathiraCount = nakchathiraCount + 1;
                            if (nakchathiraCount == this.natchathiram.length) {
                                nakchathiraCount = 0;
                            }
                            ththiCount = ththiCount + 1;
                            if (ththiCount == this.ththi.length) {
                                ththiCount = 0;
                            }
                            karanamCount = karanamCount + 1;
                            if (karanamCount == this.karanam.length) {
                                karanamCount = 0;
                            }
                            pakshamCount = pakshamCount + 1;
                            if (pakshamCount == 15) {
                                pakshamCount = 0;
                                defaultPaksham = defaultPaksham == 1 ? 0 : 1;
                            }
                            yogamCount = yogamCount + 1;
                            if (yogamCount == this.yogam.length) {
                                yogamCount = 0;
                            }
                            kilamaiCount = kilamaiCount + 1;
                            if (kilamaiCount == this.kilamai.length) {
                                kilamaiCount = 0;
                            }
                            raasiCount = raasiCount + 1;
                            if (raasiCount == this.raasi.length) {
                                raasiCount = 0;
                            }
                            thisaiCount = thisaiCount + 1;
                            if (thisaiCount == this.thisai.length) {
                                thisaiCount = 0;
                            }
                        })
                        this.addYearData(data.name + "-" + data.year, consolidatedData);

                    }
                }
            ]
        });

        await alert.present();
    }
    // testFFunction() {
    //     let date = this.getDaysInMonth(2012)
    //     let i = 1;
    //     let ththiCount = 0;
    //     let nakchathiraCount = 0;
    //     let karanamCount = 0;
    //     let pakshamCount = 0;
    //     let defaultPaksham = 0
    //     let yogamCount = 0;
    //     let kilamaiCount = 0;
    //     let raasiCount = 0;
    //     let thisaiCount = 0;
    //     date.map(res => {
    //         console.log({ "s.no": i, date: res, ththi: this.ththi[ththiCount], natchathiram: this.natchathiram[nakchathiraCount], karanam: this.karanam[karanamCount], paksham: this.paksham[defaultPaksham], yogam: this.yogam[yogamCount], kilamai: this.kilamai[kilamaiCount], raasi: this.raasi[raasiCount], thisai: this.thisai[thisaiCount], isSelected: false });
    //         i = i + 1;
    //         nakchathiraCount = nakchathiraCount + 1;
    //         if (nakchathiraCount == this.natchathiram.length) {
    //             nakchathiraCount = 0;
    //         }
    //         ththiCount = ththiCount + 1;
    //         if (ththiCount == this.ththi.length) {
    //             ththiCount = 0;
    //         }
    //         karanamCount = karanamCount + 1;
    //         if (karanamCount == this.karanam.length) {
    //             karanamCount = 0;
    //         }
    //         pakshamCount = pakshamCount + 1;
    //         if (pakshamCount == 15) {
    //             pakshamCount = 0;
    //             defaultPaksham = defaultPaksham == 1 ? 0 : 1;
    //         }
    //         yogamCount = yogamCount + 1;
    //         if (yogamCount == this.yogam.length) {
    //             yogamCount = 0;
    //         }
    //         kilamaiCount = kilamaiCount + 1;
    //         if (kilamaiCount == this.kilamai.length) {
    //             kilamaiCount = 0;
    //         }
    //         raasiCount = raasiCount + 1;
    //         if (raasiCount == this.raasi.length) {
    //             raasiCount = 0;
    //         }
    //         thisaiCount = thisaiCount + 1;
    //         if (thisaiCount == this.thisai.length) {
    //             thisaiCount = 0;
    //         }
    //     })
    // }
    delete(year){
        this.astroService.deleteYear(year.id)
    }
    addYearData(name, data) {

        this.astroService.addYear({ year: name, data: data }).then(() => {
            this.showToast('New Data Added');
        }, err => {
            this.showToast('There was a problem adding your Data :(');
        });
    }
    showToast(msg) {
        this.toastCtrl.create({
            message: msg,
            duration: 2000
        }).then(toast => toast.present());
    }
    getDaysInMonth(year) {
        var days = [];
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(month => {
            var date = new Date(year, month, 1);
            while (date.getMonth() === month) {
                days.push(new Date(date).toDateString());
                date.setDate(date.getDate() + 1);
            }
        })
        return days;
    }
}
