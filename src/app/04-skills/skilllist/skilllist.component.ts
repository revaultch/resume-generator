import { SkillCriteria, Skill } from '../skills.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, Inject, Input } from '@angular/core';

@Component({
    selector: 'app-skilllist',
    templateUrl: './skilllist.component.html',
    styleUrls: ['./skilllist.component.scss']
})
export class SkilllistComponent {

    @Input() skills: Array<Skill>;

    skillTrackByFn(i: number, skill: Skill) {
        return skill.name;
    }

}



