import {
    Component, ComponentRef, ViewContainerRef, ComponentFactoryResolver,
    ViewChild, OnInit, OnDestroy, Input
} from '@angular/core';

import { LogoStripComponent } from './logo/logo-strip.component';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit, OnDestroy {

    @Input() names;

    @ViewChild('logoStripPlaceholder', { read: ViewContainerRef })
    private dynamicTarget: any;

    private componentReference: ComponentRef<LogoStripComponent>;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        this.createStrip();
    }

    createStrip() {
        let componentFactory = this.resolver.resolveComponentFactory(LogoStripComponent);
        let strip = this.dynamicTarget.createComponent(componentFactory);
        let thiz = this;
        strip.instance.logoNames = this.names;
        strip.instance.scrollFinished.subscribe((data) => {
            thiz.reset();

        });
        this.componentReference = strip;
    }

    ngOnDestroy() {
        this.destroyStrip();
    }

    reset() {
        this.destroyStrip();
        this.createStrip();
    }

    destroyStrip() {
        if (this.componentReference) {
            this.componentReference.destroy();
        }
    }


}