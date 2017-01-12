import { Component, AfterViewInit, Inject } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { HistoryService } from './history.service';
import {Project} from '../common/project.model';
import { Observable, Observer } from 'rxjs/Rx';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {

    private container: any;

    private project: Project;

    _detailIsVisible: boolean = false;


    showDetail(properties: any) {
        this._detailIsVisible = true;
        this._historyService.getProject(properties.items[0]).subscribe((project) => {
            this.project = project;
        });

    }

    constructor(@Inject(HistoryService) private _historyService: HistoryService) {}

    ngAfterViewInit() {
        let thiz = this;
        thiz.container = document.getElementById('timeline');
        let maxDate = new Date();
        maxDate.setTime(maxDate.getTime() + 100 *(24*60*60*1000))
        let timelineOptions = {height : '600px', clickToUse : false, min : '1995-06-01', max : maxDate};

        let items = new DataSet([
        ]);

        this._historyService.getProjects().subscribe((project) => {


            items.add({id : project.id, content : project.name, start : project.estimatedStart, end: project.estimatedEnd});


            // Configuration for the Timeline

            // Create a Timeline


        }, (err) => {throw err;},
        () => {
            let timeline: Timeline = new Timeline(thiz.container, items, timelineOptions);
            timeline.setWindow('2015-01-01', '2016-01-01')
            timeline.on('select', function(props) { thiz.showDetail(props); });

        });

    }


}
