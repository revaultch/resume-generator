import { start } from 'repl';
import { Component, AfterViewInit, Inject } from '@angular/core';
import { Timeline, DataSet } from 'vis';
import { HistoryService } from './history.service';
import {Project} from '../common/project.model';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements AfterViewInit {


    constructor(@Inject(HistoryService) private _historyService: HistoryService) {}


    ngAfterViewInit() {

        this._historyService.getProjects().subscribe((projects) => {


            let container: any = document.getElementById('timeline');
            let items = new DataSet([
            ]);

            for (let project of projects) {
                items.add({content : project.name, start : project.estimatedStart, end: project.estimatedEnd});
            }


            // Configuration for the Timeline
            let options = {height : '400px', clickToUse : true};

            // Create a Timeline
            let timeline = new Timeline(container, items, options);
            timeline.on('select', function(props) {

                console.log(JSON.stringify(props));

            });

        });

    }

}
