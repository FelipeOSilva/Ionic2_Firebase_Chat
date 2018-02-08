import { UserProfilePage } from './../../pages/user-profile-page/user-profile-page';
import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from "ionic-angular";

import { AuthService } from '../../providers/auth.service';
import { BaseComponent } from '../base.components'; 
import { User } from "../../models/user.model";

@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

  @Input('user') currentUser: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

}
