import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Experience } from './experience.model';
import { Skill, SkillCriteria } from '../04-skills/skills.model';

/**
 * 


    {
        "name": "Java",
        "linkedInScore": "82",
        "interest": "8",
        "confidence": "9",
        "nbOfProjects": 28,
        "daysDone": 7403,
        "lastTimeSeen": 0
    },


 * 
 */


@Injectable()
export class DataService {
    private _resume: any;

    private _experiences: Array<Experience>;

    private _skills: Array<Skill> = new Array<Skill>();


    constructor( @Inject(Http) private _http: Http) {
    }

    public getSkills(skillCriteria: SkillCriteria): Observable<Skill> {
        return Observable.create(observer => {
            this.loadSkillsData().subscribe((skillsData) => {

                for (let item of skillsData) {
                    let skill = Skill.fromJson(item);
                    if (this.match(skillCriteria, skill)) {
                        observer.next(skill);
                    }
                }
                observer.complete();
            });
        });
    }

    private match(skillCriteria: SkillCriteria, skill: Skill): boolean {

        
        return (skill.linkedInScore > skillCriteria.linkedInScore || skillCriteria.linkedInScore == 0)
            && (skill.nbOfProjects > skillCriteria.nbOfProjects || skillCriteria.nbOfProjects == 0)
            && (skill.daysDone > skillCriteria.daysDone || skillCriteria.daysDone == 0)
            && ((!skill.confidence || skill.confidence > skillCriteria.confidence) || skillCriteria.confidence == 0)
            && (!skill.interest || skill.interest > skillCriteria.interest || skillCriteria.interest == 0)
            && (skill.lastTimeSeen > skillCriteria.lastTimeSeen * -1 || skillCriteria.lastTimeSeen == 0);
    }


    public getExperiences(): Observable<Array<Experience>> {
        return Observable.create(observer => {
            this.loadResume().subscribe((resume) => {
                let experiences = Array<Experience>();
                for (let xp of resume.work_experience) {
                    experiences.push(Experience.fromJson(xp));
                }
                observer.next(experiences);
                observer.complete();
            });

        });
    }


    private loadResume(): Observable<any> {
        return Observable.create(observer => {
            this._http.get('/borja/data/db/resume.json').subscribe((result) => {
                let resume = JSON.parse(result.text());
                observer.next(resume);
                observer.complete();
            });
        });
    }


    private loadSkillsData(): Observable<any> {
        return Observable.create(observer => {
            this._http.get('/borja/data/db/consolidated_skills.json').subscribe((result) => {
                let skillsData = JSON.parse(result.text());
                observer.next(skillsData);
                observer.complete();
            });
        });
    }


}