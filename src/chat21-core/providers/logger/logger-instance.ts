import { Injectable } from '@angular/core';
import { LoggerService } from '../abstract/logger.service';

@Injectable({
    providedIn: 'root'
})
export class LoggerInstance {

    //private variables
    private static instance: LoggerService;
    
    static getInstance() {
        return LoggerInstance.instance;
    }

    static setInstance(loggerService: LoggerService) {
        LoggerInstance.instance = loggerService
    }
}
