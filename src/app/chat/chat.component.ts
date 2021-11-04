import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WebSocketService } from '../services/web-socket.service';
import { ChatMessageDto } from '../models/chatMessageDto';
import { ChatService } from './chat.service';

@Component({
  selector: 'cf-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  user:any;
  users:any;
  message:any;
  allUsers:any;
  userExists: any = false;
  constructor(public webSocketService: WebSocketService,public chatService:ChatService) { }

  ngOnInit(): void {
    //this.webSocketService.openWebSocket();
    this.getUser()
  }

  ngOnDestroy(): void {
    this.webSocketService.closeWebSocket();
  }
  socketConnect(): void {alert("Nithesh" + this.user)
    this.webSocketService.openWebSocket(this.user);
  }
  sendMessage() {
    // const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
    //const chatMessageDto = new ChatMessageDto(this.user, sendForm.value.message);
    const chatMessageDto = new ChatMessageDto(this.user, this.message);
     this.webSocketService.sendMessage(chatMessageDto);
    // sendForm.controls.message.reset();
   }

  /* sendMessage(sendForm: NgForm) {
   // const chatMessageDto = new ChatMessageDto(sendForm.value.user, sendForm.value.message);
   //const chatMessageDto = new ChatMessageDto(this.user, sendForm.value.message);
   const chatMessageDto = new ChatMessageDto("Nithesh", "Your are a monkey");
    this.webSocketService.sendMessage(chatMessageDto);
   // sendForm.controls.message.reset();
  } */
  register() {
    //alert("welcome "  + this.username)
    this.chatService.register(this.user).subscribe(data => console.log(data));

  }

  getUser() {
    //alert("welcome "  + this.username)
    
    this.chatService.getUser().subscribe(data => this.users=data);

  }
  signIn(){
    /* this.users.map(user => {
      if (user === this.user)
      console.log()
    }) */
    for(let i =0; i<this.users.length; i++){
      if(this.users[i]["name"] === this.user){
        this.userExists = true;
        this.socketConnect();
      }
    }
  }

 
}
