import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input } from '@angular/core';

import { WorkflowEventService } from '../common/workflow/workflowevent.service';
import { EnterViewportWorkflowEvent, InViewportWorkflowEvent, ExitViewportWorkflowEvent } from '../common/workflow/workflowevent.model';
import { WorkflowEventReceiver } from '../common/workflow/workfloweventreceiver.model';

@Component({
    selector: 'app-companylogo',
    templateUrl: './companylogo.component.html',
    styleUrls: ['./companylogo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyLogoComponent {

    @Input() name: string;
    @Input() highlight: boolean;


    private _windowLoaded = false;

    @HostListener('window:load')
    onLoad() {
        this._windowLoaded = true;
    }

    constructor(@Inject(WorkflowEventService) private _workflowEventService,
    private _el: ElementRef) {
    }

    getLogo() {
        let logo = this._windowLoaded ? this.name : 'nologo';
        return '/borja/assets/images/logos/' + logo + '.png';
    }

}