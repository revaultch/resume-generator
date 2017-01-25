import { Directive, HostBinding, HostListener } from '@angular/core';


@Directive({
    selector: '[loadedDirective]'
})
export class LoadedDirective {


    @HostBinding('class.loaded') _loaded: boolean = false;

    @HostListener('window:load', ['$event'])
    onLoad(event: any) {
        this._loaded = true;
    }

}