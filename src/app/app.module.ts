import { AppConfigService } from './providers/app-config.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { ImageRepoService } from 'src/chat21-core/providers/abstract/image-repo.service';
import { FirebaseImageRepoService } from 'src/chat21-core/providers/firebase/firebase-image-repo';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AvatarComponent2 } from './components/avatar/avatar.component';
import { environment } from 'src/environments/environment';

//LOGGER SERVICES
import { LoggerInstance } from 'src/chat21-core/providers/logger/logger-instance';
import { CustomLogger } from 'src/chat21-core/providers/logger/custom-logger';



const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    let customLogger = new CustomLogger()
    LoggerInstance.setInstance(customLogger)
    if (environment.remoteConfig) {
      return appConfig.loadAppConfig();
    }
  };
};


export function imageRepoFactory(http: HttpClient) {
  //const config = appConfig.getConfig()
  // if (config.uploadEngine === UPLOAD_ENGINE_NATIVE) {
  //   const imageService = new NativeImageRepoService(http)
  //   imageService.setImageBaseUrl(config.baseImageUrl)
  //   return imageService
  // } else {
  //   const imageService = new FirebaseImageRepoService(http);
  //   FirebaseInitService.initFirebase(config.firebaseConfig)
  //   imageService.setImageBaseUrl(config.baseImageUrl)
  //   return imageService
  // }
}


@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    AvatarComponent2
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    // {
    //   provide: ImageRepoService,
    //   useFactory: imageRepoFactory,
    //   deps: [AppConfigService, HttpClient]
    // }
  ,],
  bootstrap: [AppComponent]
})
export class AppModule { }
