import { ObservableInput } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { DataService } from './../common/data.service';
import { Experience } from './../common/experience.model';
import { Project } from './../common/project.model';

@Injectable()
export class HistoryService {

    constructor( @Inject(DataService) private _dataService: DataService) {
    }


    public getProjects(): Observable<Array<Project>> {
        return Observable.create((observer) => {
            let projects = new Array<Project>();


                this._dataService.getExperiences().subscribe((experiences) => {
                    for (let experience of experiences) {
                        for (let project of experience.projects) {
                            projects.push(project);
                        }
                    }

                }, (err) => { throw err; },
                    () => {
                        observer.next(projects);
                        observer.complete();
                    });




        });
    }


}
