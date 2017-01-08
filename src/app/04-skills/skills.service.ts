import { ObservableInput } from 'rxjs/Observable';
import { Injectable, Inject } from '@angular/core';
import { Observable, Observer } from 'rxjs/Rx';
import { Skill, SkillCriteria } from './skills.model';
import { DataService } from './../common/data.service';
import { Experience } from './../common/experience.model';
import { Project } from './../common/project.model';

@Injectable()
export class SkillsService {

    constructor( @Inject(DataService) private _dataService: DataService) {
    }


    public getSkills(skillCriteria: SkillCriteria): Observable<Array<Skill>> {
        return Observable.create((observer) => {
            let skills = new Array<Skill>();
            this._dataService.getSkills(skillCriteria).subscribe((skill) => {
                skills.push(skill);
            }, (err) => { throw err; },
            () => {
                observer.next(skills);
                observer.complete();
            });
        });
    }



}
