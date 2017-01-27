import { SkillCriteria, Skill } from '../skills.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, Inject, Input } from '@angular/core';
import {i18nService} from '../../common/directives/i18n.service';

@Component({
    selector: 'app-skilllist',
    templateUrl: './skilllist.component.html',
    styleUrls: ['./skilllist.component.scss']
})
export class SkilllistComponent {

    @Input() skills: Array<Skill>;

    private _currentlyInUse: string = this._i18nService.translate('currently in use^actuellement utilisé');
    private _used: string = this._i18nService.translate('used^utilisé il y a');
    private _daysAgo: string = this._i18nService.translate('days ago^jours');

    constructor(@Inject(i18nService) private _i18nService) {}

    skillTrackByFn(i: number, skill: Skill) {
        return skill.name;
    }

    getInUse(skill: Skill) {
        return skill.lastTimeSeen == 0 ? this._currentlyInUse : this._used + ' ' + skill.lastTimeSeen * -1 + ' ' + this._daysAgo;
    }

}



