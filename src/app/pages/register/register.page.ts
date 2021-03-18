import { ModalonePage } from './modalone/modalone.page';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})

export class RegisterPage implements OnInit {

  public userRegister: User = {};
  private loading: any;
  hidePassword: boolean = true;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router,
    public auth: AngularFireAuth,
    private app: AuthService,



    //modal
    private modalCtrl: ModalController

    ){}

  ngOnInit() {
  }

  async register() {
    await this.presentLoading();

    try {
      await this.authService.register(this.userRegister);
      this.router.navigate(['/group']);

    } catch (error){
      let message: string;
      console.log(error)

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'O E-mail já está sendo usado!';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
        case 'auth/weak-password':
          message = 'A senha deve ter pelo menos 6 caracteres.';
          break;
          case 'auth/argument-error':
            message = 'É necessário informar e-mail e senha.';
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }

  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Por favor, aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      mode: 'md',
      cssClass: 'toast-center',
      message,
      duration: 3000});
    toast.present();
  }

  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (data) => {

          // 3.3) Exibe feedback usando service 'app.myAlert'
          this.app.myAlert(
            `Olá ${data.user.displayName}!`,
            'Você já pode acessar todos os recursos do aplicativo.',
            () => { this.router.navigate(['/group']); }
          );
        }
      )
      .catch((error) => { console.log(error); });
  }

  async showModalOne() {

    const modal = await this.modalCtrl.create({
      component: ModalonePage
    });

    modal.present();

  }

  async showModalTwo(){}

}
