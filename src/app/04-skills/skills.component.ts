import { SkillCriteria, Skill } from './skills.model';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, AfterViewInit, Inject, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { SkillsService } from './skills.service';
import { SkilllistComponent } from './skilllist/skilllist.component';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements AfterViewInit, OnInit {

    private skillCriteria: SkillCriteria = new SkillCriteria();

    private skills: Array<Skill> = new Array<Skill>();


    private _presets: Array<any>;

    private _presets_en: Array<any> = [
        { id: -1, name: 'Select a preset' },
        { id: 1, name: 'Top rated in LinkedIn' },
        { id: 2, name: 'Top used in projects' },
        { id: 3, name: 'Top time spent'}];

    private _presets_fr: Array<any> = [
        { id: -1, name: 'Selectionnez un préréglage' },
        { id: 1, name: 'Meilleures notes LinkedIn' },
        { id: 2, name: 'Plus utilisés dans des projets' },
        { id: 3, name: 'Plus de temps passé'}];

    private _selectedPreset: any;

    private baseKnobOptions = {
        'skin': {
            'type': 'simple', 'width': 10, 'color': 'rgba(255,0,0,.5)', 'spaceWidth': 5
        },
        'animate': { 'enabled': true, 'duration': 1000, 'ease': 'bounce' },
        'size': 100,
        'startAngle': -140,
        'endAngle': 140,
        'unit': '',
        'displayInput': true,
        'readOnly': false,
        'trackWidth': 10,
        'barWidth': 15,
        'trackColor': 'rgba(200,200,200,.8)',
        'barColor': '#3a73bf',
        'prevBarColor': '#e67e22',
        'textColor': '#000000',
        'barCap': 0,
        'trackCap': 0,
        'fontSize': 'auto',
        'subText': { 'enabled': true, 'text': '', 'color': '#000000', 'font': '11' },
        'bgColor': '',
        'bgFull': false,
        'scale': { 'enabled': false, 'type': 'lines', 'color': '#000000', 'width': 2, 'quantity': 20, 'height': 5, 'spaceWidth': 1 },
        'step': 1,
        'displayPrevious': true,
        'min': 0,
        'max': 100,
        'dynamicOptions': false
    };

    private linkedInScoreKnobOptions: any = this.options(100, 10, '#2d4052', 50);

    private nbOfProjectsKnobOptions: any = this.options(100, 10, '#3a73bf', 50);

    private weeksDoneKnobOptions: any = this.options(100, 10, '#c0392b', 150);

    private obs = new Subject();
    private obs$ = this.obs.asObservable();

    private data: any = {
        'name': 'cluster',
        'children': []
    };


    valueChange(event: any) {
        this.obs.next(event);
        if (event != null) {
            this._selectedPreset = this._presets[0];
        }
    }

    presetSelected(event: any) {
        if (this._selectedPreset.id == 1) {
            this.skillCriteria.linkedInScore = 15;
            this.skillCriteria.daysDone = 0;
            this.skillCriteria.nbOfProjects = 0;
        } else if (this._selectedPreset.id == 2) {
            this.skillCriteria.linkedInScore = 0;
            this.skillCriteria.daysDone = 0;
            this.skillCriteria.nbOfProjects = 9;
        } else if (this._selectedPreset.id == 3) {
            this.skillCriteria.linkedInScore = 0;
            this.skillCriteria.weeksDone = 20;
            this.skillCriteria.nbOfProjects = 0;
        }
        this.valueChange(null);
    }

    resetKnobs(event: any) {
        let size = window.innerWidth / 10;
        size = size > 100 ? 100 : size;
        let trackWidth : number = size / 10;
        this.linkedInScoreKnobOptions = this.options(size, trackWidth, '#2d4052', 50);
        this.nbOfProjectsKnobOptions = this.options(size, trackWidth, '#3a73bf', 50);
        this.weeksDoneKnobOptions = this.options(size, trackWidth, '#c0392b', 150);
    }

    private options(size, trackWidth, color, max) {
        let result = JSON.parse(JSON.stringify(this.baseKnobOptions));
        result.size = size;
        result.trackWidth = trackWidth;
        result.barWidth = trackWidth + 5;
        result.barColor = color;
        result.max = max;
        return result;
    }


    constructor( @Inject(SkillsService) private _skillsService: SkillsService) { }

    ngOnInit() {
        if (navigator.language == 'fr') {
            this._presets = this._presets_fr;
        } else {
            this._presets = this._presets_en;
        }
        this._selectedPreset = this._presets[0]
    }

    ngAfterViewInit() {
        this.obs$.debounceTime(500).startWith('').subscribe((click) => {
            this._skillsService.getSkills(this.skillCriteria).subscribe((skills) => {
                this.skills = skills;
                this.resetKnobs(null)
            });
        });

    }

}


