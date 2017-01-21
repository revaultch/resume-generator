import {ElementRef} from '@angular/core';
import {EnterViewportWorkflowEvent, InViewportWorkflowEvent, ExitViewportWorkflowEvent} from './workflowevent.model';

export interface WorkflowEventReceiver {

    handleWorkflowEnter(event: EnterViewportWorkflowEvent);

    handleWorkflowIn(event: InViewportWorkflowEvent);

    handleWorkflowExit(event: ExitViewportWorkflowEvent);

    getElementRef(): ElementRef;

}