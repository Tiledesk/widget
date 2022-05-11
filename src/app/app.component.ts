import { Component } from '@angular/core';

@Component({
  selector: 'chat-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'widget';

  baseLocation=""
  
  message = {
    senderID: "eee",
    sender_fullname: "gab"
  }
}
