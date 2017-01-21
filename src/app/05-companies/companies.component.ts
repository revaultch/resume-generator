import {
    Component, ComponentRef, ViewContainerRef, ComponentFactoryResolver,
    ViewChild, OnInit, OnDestroy, Input, AfterViewInit, Inject, ElementRef
} from '@angular/core';

import { WorkflowEventService } from '../common/workflow/workflowevent.service';
import { EnterViewportWorkflowEvent, InViewportWorkflowEvent, ExitViewportWorkflowEvent } from '../common/workflow/workflowevent.model';
import { WorkflowEventReceiver } from '../common/workflow/workfloweventreceiver.model';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements AfterViewInit, WorkflowEventReceiver {

    @Input() names: Array<string>;

    @ViewChild('logoPanel', { read: ViewContainerRef })
    private logoPanel: any;

    private _highlightIndex = [];

    private _effectDone = false;

    constructor(private resolver: ComponentFactoryResolver, @Inject(WorkflowEventService) private _workflowEventService,
    private _el: ElementRef) {
    }


    ngAfterViewInit() {
       this._workflowEventService.getWorkflowEvents(this).subscribe();
    }

    triggerEffect() {
        let thiz = this;
        for (let i = 0 ; i < 13 ; i++) {
            window.setTimeout( function() {
                thiz._highlightIndex[i] = true;
                window.setTimeout( function() {
                    thiz._highlightIndex[i] = false;
                }, 1000);
            }, 100 * i);
        }
    }

    handleWorkflowEnter(event: EnterViewportWorkflowEvent) {
    }

    handleWorkflowIn(event: InViewportWorkflowEvent) {
        if (event.middlePositionInPercent < 55 && !this._effectDone) {
            this.triggerEffect();
            this._effectDone = true;
        }
    }


    handleWorkflowExit(event: ExitViewportWorkflowEvent) {
        this._effectDone = false;
    }


    getElementRef(): ElementRef {
        return this.logoPanel.element;
    }





}