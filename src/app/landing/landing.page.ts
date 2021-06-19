import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { PasswordService } from '../password.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  constructor(private toastController: ToastController, private loadingController: LoadingController, private passwordService: PasswordService, private router: Router, public alertController: AlertController) { }

  ngOnInit() {

  }
  login(form) {
    this.activeLoader();
    this.passwordService.getPassword().subscribe(res => {
      if (res) {
        if (form.value.pin == res.password) {
          this.router.navigate(['/list']);
          // localStorage.setItem("isLogin", "true")
        } else {
          this.dismissLoading();
          this.presentAlert();
          return
        }
        this.dismissLoading();
      }
    }, error => {
      console.log(error)
    })
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
  async changepassword() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Change Password!',
      inputs: [
        {
          name: 'password',
          type: 'text'
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
          text: 'Save',
          handler: (data) => {
            if (data.password) {
              this.activeLoader();
              this.passwordService.updatePassword({ password: data.password }).then((res: any) => {
                this.presentToast("Updated Successfull");
                this.dismissLoading();
              })
            }
          }
        }
      ]
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
}
