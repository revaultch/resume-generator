import {
    Component, ElementRef, ComponentRef, ViewContainerRef, ComponentFactoryResolver,
    ViewChild, OnInit, OnDestroy, Input, AfterViewInit, EventEmitter, Output
} from '@angular/core';

import { LogoComponent } from './logo.component';


@Component({
    selector: 'app-logo-strip',
    templateUrl: './logo-strip.component.html',
    styleUrls: ['./logo-strip.component.scss']
})
export class LogoStripComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input() logoNames;

    @Output() scrollFinished = new EventEmitter();

    private scroll = false;

    @ViewChild('logostrip', {read: ViewContainerRef})
    private _logostrip: any;

    @ViewChild('logoPlaceholder', { read: ViewContainerRef })
    private dynamicTarget: any;

    private componentReferences: Array<ComponentRef<LogoComponent>> = new Array<ComponentRef<LogoComponent>>();

    private doChecks() {
        if (this._logostrip.element.nativeElement.offsetLeft < (this._logostrip.element.nativeElement.offsetWidth * -1)) {
            this.scrollFinished.emit({});
        }
    }



    constructor(private resolver: ComponentFactoryResolver ) {
    }

    ngOnInit() {
        // Create our component now we're initialised
        let componentFactory = this.resolver.resolveComponentFactory(LogoComponent);

        for (let logoName of this.logoNames.split(',')) {
            let item = this.dynamicTarget.createComponent(componentFactory);
            item.instance.logoName = logoName;
            this.componentReferences.push(item);
        }


    }

    ngOnDestroy() {
        // If we have a component, make sure we destroy it when we lose our owner
        for (let componentReference of this.componentReferences) {
            if (componentReference) {
                componentReference.destroy();
            }
        }
    }

    ngAfterViewInit() {
        // avoiding round check issue
        let thiz = this;
        window.setTimeout(function () {
            thiz.scroll = true;
        }, 500);

        window.setInterval(function() {
            thiz.doChecks();
        }, 3000);
    }




}