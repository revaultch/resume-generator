import { Directive, ElementRef, Input, OnInit, Renderer, Inject } from '@angular/core';
import {i18nService} from './i18n.service';

@Directive({
    selector: '[i18n]'
})
export class i18nDirective implements OnInit {

    @Input('i18n') i18nattr: string = null;

    constructor(@Inject(i18nService) private _i18nService: i18nService ,private _el: ElementRef, private _renderer: Renderer) {
    }

    ngOnInit() {
        if (this.i18nattr === null || this.i18nattr === '') {
            this._el.nativeElement.innerHTML = this._i18nService.translate(this._el.nativeElement.innerHTML)
        } else {
            let attrName:string = Object.keys(this.i18nattr)[0];
            let data = this._i18nService.translate(this.i18nattr[attrName])
            this._renderer.setElementAttribute(this._el.nativeElement, attrName, data);     
        }
    }

}