import { Component, ViewChild } from '@angular/core/';


import { ChatService } from './../../providers/chat.service';
import { Chat } from './../../models/chat.model';

import { Content, NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../providers/user.service';
import { Message } from '../../models/message.model';
import { MessageService } from '../../providers/message.service';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';

import firebase from 'firebase';

@Component({
  selector: 'page-chat-page',
  templateUrl: 'chat-page.html',
})
export class ChatPage {

  @ViewChild(Content) content: Content;

  messages: FirebaseListObservable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ionViewDidLoad() {

    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.name;

    this.userService.currentUser
      .first()
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(
          this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(
          this.recipient.$key, this.sender.$key);

        if (this.recipient.photo) {
          this.chat1
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
            })
        }
        if (this.sender.photo) {
          this.chat2
            .first()
            .subscribe((chat: Chat) => {
              this.chatService.updatePhoto(this.chat2, chat.photo, this.sender.photo);
            })
        }

        let doSubscription = () => {
          this.messages
            .subscribe((messages: Message[]) => {
              this.scrollToBottom();
            });
        };

        this.messages = this.messageService
          .getMessages(this.sender.$key, this.recipient.$key);

        this.messages
          .first()
          .subscribe((messages: Message[]) => {
            if (messages.length === 0) {

              this.messages = this.messageService
                .getMessages(this.recipient.$key, this.sender.$key);

              doSubscription();
            } else {

              doSubscription();
            }
          });

      });

  }

  sendMessage(newMessage: string): void {

    if (newMessage) {

      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService.create(
        new Message(
          this.sender.$key,
          newMessage,
          currentTimestamp
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })
        this.chat2
          .update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          })
      });
    }
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50)
  }
}
