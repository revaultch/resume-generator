import { Directive, HostBinding, HostListener } from '@angular/core';


@Directive({
    selector: '[loadedDecorator]'
})
export class LoadedDecoratorDirective {


    @HostBinding('class.loaded') _loaded: boolean = false;

    @HostListener('window:load', ['$event'])
    onLoad(event: any) {
        this._loaded = true;
    }

}