import { Directive, ElementRef, Input, OnInit, Renderer2, Inject } from '@angular/core';
import { i18nService } from './i18n.service';

@Directive({
    selector: '[i18n]'
})
export class I18nDirective implements OnInit {

    @Input('i18n') i18n: string = null;

    constructor(@Inject(i18nService) private _i18nService: i18nService, private _el: ElementRef, private _renderer: Renderer2) {
    }

    ngOnInit() {
        if (!this.i18n || this.i18n === '') {
            this._el.nativeElement.innerHTML = this._i18nService.translate(this._el.nativeElement.innerHTML);
        } else {
            const attrName: string = Object.keys(this.i18n)[0];
            const data = this._i18nService.translate(this.i18n[attrName]);
            this._renderer.setAttribute(this._el.nativeElement, attrName, data);
        }
    }

}