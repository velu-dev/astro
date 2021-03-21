import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
// import { ColumnMode } from '/public-api';
import { ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';
import { AstroService } from '../astro.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomePage {
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
  editing = {};
  rows = [];
  tempData = []
  ColumnMode = ColumnMode;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  constructor(private route: ActivatedRoute, private astroService: AstroService) {
    console.log(this.route)
    this.route.params.subscribe(params => {
      this.astroService.getYear(params.id).subscribe(res => {
        console.log(res.data[0])
        this.tempData = [...res.data]
        this.rows = res.data;
      })
    })
  }
  updateFilter(event) {
    const val = event.target.value;

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.name.indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }
}
