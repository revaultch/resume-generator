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


    public getProjects(): Observable<Project> {
        return Observable.create((observer) => {
            this._dataService.getExperiences().subscribe((experiences) => {
                for (let experience of experiences) {
                    for (let project of experience.projects) {
                        observer.next(project);
                    }
                }

            }, (err) => { throw err; },
                () => {
                    observer.complete();
                });

        });
    }


    public getProject(id: string): Observable<Project> {
        return this.getProjects().first((p, idx, obs) => { return p.id === id; });
    }

}