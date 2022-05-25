import { ListAllConversationsComponent } from './component/list-all-conversations/list-all-conversations.component';
//ANGULAR MODULES
import { AppRoutingModule } from './app-routing.module';
import { AppConfigService } from './providers/app-config.service';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';

//THIRD-PART MODULES
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment';

//DIRECTIVES
import { HtmlEntitiesEncodePipe } from './directives/html-entities-encode.pipe';
import { MarkedPipe } from './directives/marked.pipe';
import { SafeHtmlPipe } from './directives/safe-html.pipe';

//COMPONENTS
import { AppComponent } from './app.component';


//LOGGER SERVICES
import { LoggerInstance } from 'src/chat21-core/providers/logger/loggerInstance';
import { CustomLogger } from 'src/chat21-core/providers/logger/customLogger';

//ABSTRACT SERVICES
import { AppStorageService } from 'src/chat21-core/providers/abstract/app-storage.service';
import { MessagingAuthService } from 'src/chat21-core/providers/abstract/messagingAuth.service';
import { ConversationsHandlerService } from 'src/chat21-core/providers/abstract/conversations-handler.service';
import { ArchivedConversationsHandlerService } from 'src/chat21-core/providers/abstract/archivedconversations-handler.service';
import { ConversationHandlerBuilderService } from 'src/chat21-core/providers/abstract/conversation-handler-builder.service';
import { ConversationHandlerService } from 'src/chat21-core/providers/abstract/conversation-handler.service';
import { ImageRepoService } from 'src/chat21-core/providers/abstract/image-repo.service';
import { PresenceService } from 'src/chat21-core/providers/abstract/presence.service';
import { TypingService } from 'src/chat21-core/providers/abstract/typing.service';
import { UploadService } from 'src/chat21-core/providers/abstract/upload.service';

//FIREBASE SERVICES
import { FirebaseInitService } from 'src/chat21-core/providers/firebase/firebase-init-service';
import { FirebaseAuthService } from 'src/chat21-core/providers/firebase/firebase-auth-service';
import { FirebaseConversationsHandler } from 'src/chat21-core/providers/firebase/firebase-conversations-handler';
import { FirebaseArchivedConversationsHandler } from 'src/chat21-core/providers/firebase/firebase-archivedconversations-handler';
import { FirebaseConversationHandlerBuilderService } from 'src/chat21-core/providers/firebase/firebase-conversation-handler-builder.service';
import { FirebaseConversationHandler } from 'src/chat21-core/providers/firebase/firebase-conversation-handler';
import { FirebaseTypingService } from 'src/chat21-core/providers/firebase/firebase-typing.service';
import { FirebasePresenceService } from 'src/chat21-core/providers/firebase/firebase-presence.service';
import { FirebaseImageRepoService } from 'src/chat21-core/providers/firebase/firebase-image-repo';
import { FirebaseUploadService } from 'src/chat21-core/providers/firebase/firebase-upload.service';

//MQTT SERVICES
import { Chat21Service } from 'src/chat21-core/providers/mqtt/chat-service';
import { MQTTAuthService } from 'src/chat21-core/providers/mqtt/mqtt-auth-service';
import { MQTTConversationsHandler } from 'src/chat21-core/providers/mqtt/mqtt-conversations-handler';
import { MQTTArchivedConversationsHandler } from 'src/chat21-core/providers/mqtt/mqtt-archivedconversations-handler';
import { MQTTConversationHandlerBuilderService } from 'src/chat21-core/providers/mqtt/mqtt-conversation-handler-builder.service';
import { MQTTConversationHandler } from 'src/chat21-core/providers/mqtt/mqtt-conversation-handler';
import { MQTTTypingService } from 'src/chat21-core/providers/mqtt/mqtt-typing.service';
import { MQTTPresenceService } from 'src/chat21-core/providers/mqtt/mqtt-presence.service';

// NATIVE TILEDESK SERVICES
import { TiledeskAuthService } from './../chat21-core/providers/tiledesk/tiledesk-auth.service';
import { NativeImageRepoService } from 'src/chat21-core/providers/native/native-image-repo';
import { NativeUploadService } from 'src/chat21-core/providers/native/native-upload-service';

//CONSTANTS
import { CHAT_ENGINE_MQTT, UPLOAD_ENGINE_NATIVE } from 'src/chat21-core/utils/constants';

import { LocalSessionStorage } from 'src/chat21-core/localSessionStorage';


import { TranslatorService } from './providers/translator.service';
import { Globals } from './utils/globals';
import { GlobalSettingsService } from './providers/global-settings.service';
import { Triggerhandler } from 'src/chat21-core/utils/triggerHandler';
import { CustomTranslateService } from 'src/chat21-core/custom-translate.service';
import { SettingsSaverService } from './providers/settings-saver.service';
import { LauncherButtonComponent } from './component/launcher-button/launcher-button.component';
import { EyeeyeCatcherCardComponent } from './component/eyeeye-catcher-card/eyeeye-catcher-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WaitingService } from './providers/waiting.service';
import { HomeConversationsComponent } from './component/home-conversations/home-conversations.component';
import { HomeComponent } from './component/home/home.component';
import { ListConversationsComponent } from './component/list-conversations/list-conversations.component';




const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    let customLogger = new CustomLogger()
    console.log('appInitializer...')
    LoggerInstance.setInstance(customLogger)
    if (environment.remoteConfig) {
      return appConfig.loadAppConfig();
    }
  };
};


export function authenticationFactory(http: HttpClient, appConfig: AppConfigService, chat21Service: Chat21Service, appSorage: AppStorageService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    chat21Service.config = config.chat21Config;
    chat21Service.initChat();
    const auth = new MQTTAuthService(http, chat21Service, appSorage);
    auth.setBaseUrl(appConfig.getConfig().apiUrl)
    return auth
  } else {
    FirebaseInitService.initFirebase(config.firebaseConfig)
    const auth= new FirebaseAuthService(http);
    auth.setBaseUrl(config.apiUrl)
    return auth
  }
}

export function conversationsHandlerFactory(chat21Service: Chat21Service, httpClient: HttpClient, appConfig: AppConfigService ) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTConversationsHandler(chat21Service);
  } else {
    return new FirebaseConversationsHandler(httpClient, appConfig);
  }
}

export function archivedConversationsHandlerFactory(chat21Service: Chat21Service, appConfig: AppConfigService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTArchivedConversationsHandler(chat21Service);
  } else {
    return new FirebaseArchivedConversationsHandler();
  }
}

export function conversationHandlerBuilderFactory(chat21Service: Chat21Service, appConfig: AppConfigService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTConversationHandlerBuilderService(chat21Service);
  } else {
    return new FirebaseConversationHandlerBuilderService();
  }
}

export function conversationHandlerFactory(chat21Service: Chat21Service, appConfig: AppConfigService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTConversationHandler(chat21Service, true);
  } else {
    return new FirebaseConversationHandler(true);
  }
}

export function typingFactory(appConfig: AppConfigService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTTypingService();
  } else {  
    return new FirebaseTypingService(); 
  }
}

export function presenceFactory(appConfig: AppConfigService) {
  const config = appConfig.getConfig()
  if (config.chatEngine === CHAT_ENGINE_MQTT) {
    return new MQTTPresenceService();
  } else {
    return new FirebasePresenceService();
  }
}

export function imageRepoFactory(appConfig: AppConfigService, http: HttpClient) {
  const config = appConfig.getConfig()
  if (config.uploadEngine === UPLOAD_ENGINE_NATIVE) {
    const imageService = new NativeImageRepoService(http)
    imageService.setImageBaseUrl(config.baseImageUrl)
    return imageService
  } else {
    const imageService = new FirebaseImageRepoService(http);
    FirebaseInitService.initFirebase(config.firebaseConfig)
    imageService.setImageBaseUrl(config.baseImageUrl)
    return imageService
  }
}

export function uploadFactory(http: HttpClient, appConfig: AppConfigService, appStorage: AppStorageService) {
  const config = appConfig.getConfig()
  if (config.uploadEngine === UPLOAD_ENGINE_NATIVE) {
    const nativeUploadService = new NativeUploadService(http, appStorage)
    nativeUploadService.setBaseUrl(config.apiUrl)
    return nativeUploadService
  } else {
    return new FirebaseUploadService();
  }
}


@NgModule({
  declarations: [
    AppComponent,
    LauncherButtonComponent,
    EyeeyeCatcherCardComponent,
    HomeConversationsComponent,
    HomeComponent,
    ListConversationsComponent,
    ListAllConversationsComponent,
    /**DIRECTIVES */
    HtmlEntitiesEncodePipe,
    MarkedPipe,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    TranslateModule.forRoot(//),
    {
      // loader: {
      //   provide: TranslateLoader,
      //   useFactory: (createTranslateLoader),
      //   deps: [HttpClient]
      // }
    }),
  ],
  providers: [
    AppConfigService,
    Chat21Service,
    Globals,
    GlobalSettingsService,
    SettingsSaverService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [AppConfigService]
    },
    {
      provide: AppStorageService,
      useClass: LocalSessionStorage
    },
    {
      provide: MessagingAuthService,
      useFactory: authenticationFactory,
      deps: [HttpClient, AppConfigService, Chat21Service, AppStorageService ]
    },
    {
      provide: ConversationsHandlerService,
      useFactory: conversationsHandlerFactory,
      deps: [Chat21Service, HttpClient, AppConfigService]
    },
    {
      provide: ArchivedConversationsHandlerService,
      useFactory: archivedConversationsHandlerFactory,
      deps: [Chat21Service, AppConfigService]
    },
    {
      provide: ConversationHandlerBuilderService,
      useFactory: conversationHandlerBuilderFactory,
      deps: [Chat21Service, AppConfigService]
    },
    {
      provide: ConversationHandlerService,
      useFactory: conversationHandlerFactory,
      deps: [Chat21Service, AppConfigService]
    },
    {
      provide: ImageRepoService,
      useFactory: imageRepoFactory,
      deps: [AppConfigService, HttpClient]
    },
    {
      provide: PresenceService,
      useFactory: presenceFactory,
      deps: [AppConfigService]
    },
    {
      provide: TypingService,
      useFactory: typingFactory,
      deps: [AppConfigService]
    },
    {
      provide: UploadService,
      useFactory: uploadFactory,
      deps: [HttpClient, AppConfigService, AppStorageService ]
    },
    TiledeskAuthService,
    TranslatorService,
    CustomTranslateService,
    Triggerhandler,
    WaitingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
