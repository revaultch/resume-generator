import { Component, OnInit, AfterViewInit, Inject, ViewChild, ViewContainerRef, ElementRef } from '@angular/core';
import { HistoryService } from './history.service';
import { Project } from '../common/project.model';
import { Observable, Observer } from 'rxjs/Rx';
import { WorkflowEventService } from '../common/workflow/workflowevent.service';
import { EnterViewportWorkflowEvent, InViewportWorkflowEvent, ExitViewportWorkflowEvent } from '../common/workflow/workflowevent.model';
import { WorkflowEventReceiver } from '../common/workflow/workfloweventreceiver.model';

@Component({
    selector: 'app-history',
    templateUrl: 'history.component.html',
    styleUrls: ['history.component.scss']

})
export class HistoryComponent implements OnInit, AfterViewInit, WorkflowEventReceiver {


    @ViewChild('historyviewer', { read: ViewContainerRef })
    private _historyViewer: any;

    _start: Date = new Date(1996, 0, 1);
    _end: Date = new Date();
    _projects: Array<Project> = new Array<Project>();
    _selectedProject: Project;

    _isInViewport = false;


    constructor( @Inject(HistoryService) private _historyService: HistoryService,
        @Inject(WorkflowEventService) private _workflowEventService) { }


    ngOnInit() {
        // load all projects
        let tmp = new Array<Project>();
        this._historyService.getProjects().subscribe((project) => {
            tmp.push(project);
        },
            (err) => {
                throw err;
            },
            () => {
                this._projects = tmp.reverse();
            });


    }

    ngAfterViewInit() {
        this._workflowEventService.getWorkflowEvents(this).subscribe();
    }



    selectProject(event: any) {
        this._selectedProject = event.value;
    }

    handleWorkflowEnter(event: EnterViewportWorkflowEvent) {
        this._isInViewport = false; // expect to have at least nfapply%
    }

    handleWorkflowIn(event: InViewportWorkflowEvent) {
        this._isInViewport = event.coverageInPercent > 20.0;
    }


    handleWorkflowExit(event: ExitViewportWorkflowEvent) {
        this._isInViewport = false; // expect to have at least n%
    }


    getElementRef(): ElementRef {
        return this._historyViewer.element;
    }


}
