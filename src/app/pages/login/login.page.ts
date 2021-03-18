import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/app';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public userLogin: User = {};
  private loading: any;
  hidePassword: boolean = true;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    public auth: AngularFireAuth,
    private router: Router,
    private app: AuthService
  ) { }

  ngOnInit() {
  }

  async login() {
    await this.presentLoading();

    try {
      await this.authService.login(this.userLogin);
      this.router.navigate(['/group']);

    } catch (error) {
      let message: string;
      console.log(error)

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'O E-mail já está sendo usado!';
          break;
        case 'auth/invalid-email':
          message = 'E-mail inválido.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'Usuário e/ou senha inválido.';
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
      cssClass: 'toast-center',
      message,
      duration: 2000});
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
}
