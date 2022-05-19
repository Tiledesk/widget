import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ImageRepoService } from 'src/chat21-core/providers/abstract/image-repo.service';

@Component({
  selector: 'chat-avatar-image',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit {

  @Input() senderID: string;
  @Input() senderFullname: string;
  @Input() baseLocation: string;
  url: string;
  constructor(private imageRepoService: ImageRepoService) { }

  ngOnInit() {
    console.log('senderrr', this.senderID)
    if(this.senderID){
      if(this.senderID.indexOf('bot_') !== -1 || this.senderFullname === 'Bot'){
        // this.url =  this.baseLocation +'/assets/images/avatar_bot_tiledesk.svg'
        this.url= "https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg"
      }else if( this.senderID.indexOf('bot_') == -1){
        // this.url =  this.baseLocation +'/assets/images/light_avatar_placeholder.svg'
        this.url= "https://cdn1.vectorstock.com/i/1000x1000/23/70/man-avatar-icon-flat-vector-19152370.jpg"
      }
      console.log('urlllll', this.url)
      // let url = this.imageRepoService.getImagePhotoUrl(this.senderID)
      // this.imageRepoService.checkImageExists(url,  (existImage)=> {
      //   existImage? this.url = url: null;
      //   console.log('existttttt', existImage)
      // })
      // this.checkImageExists(url, (existImage)=> {
      //   existImage? this.url = url: null; 
      // })
    }
    
  }

  onBotImgError(event){
    event.target.src = this.baseLocation +'/assets/images/avatar_bot_tiledesk.svg'
  }
  onHumanImgError(event) {
    event.target.src = this.baseLocation + "/assets/images/light_avatar_placeholder.svg"
  }

  onLoadedBot(event){
    // console.log('LOADED Bot avatar image...')
  }

  onLoadedHuman(event){
    // console.log('LOADED Bot human image...')
  }


  checkImageExists(imageUrl, callBack) {
    var imageData = new Image();
    imageData.onload = function () {
      callBack(true);
    };
    imageData.onerror = function () {
      callBack(false);
    };
    imageData.src = imageUrl;
  }

  ngOnChanges(changes: SimpleChanges){
    console.log('changesssss', changes)
  }

}
