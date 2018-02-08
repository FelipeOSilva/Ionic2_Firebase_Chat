import { UserProfilePage } from './../pages/user-profile-page/user-profile-page';
import { MessageService } from './../providers/message.service';
import { BrowserModule } from '@angular/platform-browser';

import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { AngularFireModule, AuthProviders, AuthMethods, FirebaseAppConfig } from 'angularfire2';
import { SignupPage } from '../pages/signup-page/signup-page';

import { UserService } from '../providers/user.service';
import { AuthService } from '../providers/auth.service';
import { SigninPage } from '../pages/signin-page/signin-page';
import { CustomLoggedHeaderComponent } from '../components/custom-logged-header/custom-logged-header.component';
import { CapitalizePipe } from '../pipes/capitalize.pipe';
import { ChatPage } from '../pages/chat-page/chat-page';
import { ChatService } from '../providers/chat.service';
import { MessageBoxComponent } from '../components/message-box/message-box.component';
import { UserInfoComponent } from '../components/user-info/user-info.component';
import { UserMenuComponent } from '../components/user-menu/user-menu.component';
import { ProgressBarComponent } from '../components/progress-bar/progress-bar.component';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyATft66w9y6znW4vwGAtH8IjuO2VHAgDKM",
  authDomain: "ionic2-firebase-chat-95c9f.firebaseapp.com",
  databaseURL: "https://ionic2-firebase-chat-95c9f.firebaseio.com",
  //  projectId: "ionic2-firebase-chat-95c9f",
  storageBucket: "ionic2-firebase-chat-95c9f.appspot.com",
  //  messagingSenderId: "1052671721140"
};
const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    CapitalizePipe,
    ChatPage,
    CustomLoggedHeaderComponent,
    HomePage,
    MessageBoxComponent,
    MyApp,
    SigninPage,
    SignupPage,
    ProgressBarComponent,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ChatPage,
    HomePage,
    MyApp,
    SigninPage,
    SignupPage,
    UserProfilePage
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
