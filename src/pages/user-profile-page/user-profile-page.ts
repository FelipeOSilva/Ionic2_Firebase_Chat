import { UserService } from './../../providers/user.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { User } from '../../models/user.model';
//import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'page-user-profile-page',
  templateUrl: 'user-profile-page.html',
})
export class UserProfilePage {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
//    public cd: ChangeDetectorRef,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService,
  ) {
  }

  ionViewCanEnter() {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.currentUser = user
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.filePhoto) {
      let a: any = 0;
      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot) => {

        console.log(a++);
        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//        this.cd.detectChanges();

      }, (error: Error) => {
        console.log(error.message);
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });
    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
    console.log(event.target.files);
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
//        this.cd.detectChanges();
      })
  }

}
