import {
    Component, Input, Inject, ElementRef, ChangeDetectionStrategy
} from '@angular/core';

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

    constructor(@Inject(WorkflowEventService) private _workflowEventService,
    private _el: ElementRef) {
    }

}