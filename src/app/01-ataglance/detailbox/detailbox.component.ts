import { Component, Input, AfterViewInit, Inject, ElementRef, ViewContainerRef, ViewChild } from '@angular/core';
import { WorkflowEventService } from '../../common/workflow/workflowevent.service';
import { EnterViewportWorkflowEvent, InViewportWorkflowEvent, ExitViewportWorkflowEvent } from '../../common/workflow/workflowevent.model';
import { WorkflowEventReceiver } from '../../common/workflow/workfloweventreceiver.model';

@Component({
  selector: 'app-detailbox',
  templateUrl: './detailbox.component.html',
  styleUrls: ['./detailbox.component.scss']
})
export class DetailBoxComponent implements AfterViewInit, WorkflowEventReceiver {

  @Input() logo;
  @Input() title;


  @ViewChild('detailbox', { read: ViewContainerRef })
  private _detailBox: any;

  private _isInViewport = false;

  constructor(
    @Inject(WorkflowEventService) private _workflowEventService) { }

  ngAfterViewInit() {
    this._workflowEventService.getWorkflowEvents(this).subscribe();
  }



  handleWorkflowEnter(event: EnterViewportWorkflowEvent) {
    this._isInViewport = false; // expect to have at least n%
  }

  handleWorkflowIn(event: InViewportWorkflowEvent) {
    this._isInViewport = event.middlePositionInPercent > 25 && event.middlePositionInPercent < 75;
  }


  handleWorkflowExit(event: ExitViewportWorkflowEvent) {
    this._isInViewport = false; // expect to have at least n%
  }

  getElementRef(): ElementRef {
    return this._detailBox.element;
  }


}
