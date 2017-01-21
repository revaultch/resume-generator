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
                skills = skills.sort(this.compareSkills).slice(0, 19);
                observer.next(skills);
                observer.complete();
            });
        });
    }

    compareSkills(s1: Skill, s2: Skill) {
        if (s2.lastTimeSeen !== s1.lastTimeSeen) {
            return s2.lastTimeSeen - s1.lastTimeSeen;
        } else {
            return s2.daysDone - s1.daysDone;
        }
    }



}
