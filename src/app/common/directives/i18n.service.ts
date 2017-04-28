import { Injectable, Inject } from '@angular/core';

const FR = "fr";
const EN = "en";

@Injectable()
export class i18nService {

 
    private _location;
    private _navigatorLanguage;

    constructor() {
        if (window.location) {
            this._location = window.location.toString()
        }
        this._navigatorLanguage = navigator.language;
    }


    // TODO !!!!
    // en : first -- fr : second
    public translate(str: string) {
            let data = str.split('^');
            if (this.getLanguage() == FR)  {
                return data[1];
            } else {
                return data[0];
            }

    }

    public getLanguage() : string {
        if (this._location) {
            if (this._location.indexOf("/" + FR) != -1) {
                return FR;
            } else if (this._location.indexOf("/" + EN) != -1) {
                return EN;
            } else {
                return this._navigatorLanguage;
            }
        } else {
            return this._navigatorLanguage;
        }
    }



}