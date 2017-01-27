import { Injectable } from '@angular/core';

@Injectable()
export class i18nService {

    // TODO !!!!
    // en : first -- fr : second
    public translate(str: string) {
            let data = str.split('^');
            if (navigator.language == 'fr') {
                return data[1];
            } else {
                return data[0];
            }

    }
}