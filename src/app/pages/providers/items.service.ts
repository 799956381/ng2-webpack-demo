import { Injectable } from '@angular/core';
import { Logger } from './logger.service';



@Injectable()
export class ItemsService {
    constructor(private logger: Logger) {  }
    getItems() {
        this.logger.log('Getting heroes ...');
        return [
            {name:"aaaaaa"},
            {name:"bbbbbbbb"},
            {name:"ccccccc"},
        ];
    }
}