import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private router: Router, public alertController: AlertController) { }

  ngOnInit() {
  }
  login(form) {
    console.log(form.value)
    if (form.value.pin == "1566") {
      this.router.navigate(['/list']);
      localStorage.setItem("isLogin", "true")
    } else {
      this.presentAlert();
    }
  }
  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: 'Your pin number is wrong try again.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
