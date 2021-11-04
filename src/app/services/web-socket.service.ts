import { Injectable } from '@angular/core';
import { ChatMessageDto } from '../models/chatMessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket: WebSocket;
  url:any;
  chatMessages: ChatMessageDto[] = [];

  constructor() { }

  public openWebSocket(user:any){
    this.url = 'ws://localhost:5001/chat?userid=9b580ce5-affb-462b-a766-baa765dff551';
   // this.url = 'ws://localhost:5001/chat?userid=' + user;
    this.webSocket = new WebSocket(this.url);

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      console.log('On message: ', event);
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessageDto){
    this.webSocket.send(JSON.stringify(chatMessageDto));
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
