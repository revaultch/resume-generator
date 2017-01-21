import {Experience} from './experience.model';

export class Project {

    private logolist: Array<string> = ['adeya', 'capital', 'ikentoo', 'ilo', 'lodh', 'nestle', 'pictet', 'tcs', 'zong', 'cross', 'orange', 'revault'];

    public static fromJson(experience: Experience, totalExperienceDays: number, estimatedStart: Date, project: any): Project {
        let techSkills = [];
        let bizSkills = [];
        let projectDays = 0;
        let company = experience.company;

        if (project.start) {
            estimatedStart = new Date(project.start.year, project.start.month - 1);
        }

        if (project.skills) {
            techSkills = Project.toArray(project.skills.technical);
            bizSkills = Project.toArray(project.skills.business);
        }

        if (project.duration) {
            projectDays = Project.toProjectDays(project.duration, totalExperienceDays);
        }

        if (project.company) {
            company = project.company;
        }

        return new Project(project.name, Project.toArray(project.description), Project.toArray(project.roles),
            techSkills,
            bizSkills,
            estimatedStart,
            projectDays, company, experience);
    }

    private static toProjectDays(projectDuration: string, totalExperienceDays: number): number {
        if (projectDuration.endsWith('m')) {
            return Number(projectDuration.substr(0, projectDuration.length - 1)) * 30;
        } else {
            return Number(projectDuration) / 100 * totalExperienceDays;
        }
    }

    private static toArray(items: Array<string>) {
        let result: Array<string> = new Array<string>();
        if (items) {
            for (let x of items) {
                result.push(x);
            }
        }
        return result;
    }

    private constructor(private _name: string, private _description: Array<string>, private _roles: Array<string>,
        private _tech_skills: Array<string>, private _business_skills: Array<string>, private _estimated_start: Date,
        private _duration_in_days: number, private _company: string , private _parent: Experience) { };


    get name(): string {
        return this._name;
    }

    get description(): Array<string> {
        return this._description;
    }

    get roles(): Array<string> {
        return this._roles;
    }

    get techSkills(): Array<string> {
        return this._tech_skills;
    }

    get businessSkills(): Array<string> {
        return this._business_skills;
    }

    get durationInDays(): number {
        return this._duration_in_days;
    }

    get estimatedStart(): Date {
        return this._estimated_start;
    }

    get estimatedEnd(): Date {
        let estimatedEnd = new Date();
        estimatedEnd.setTime(this._estimated_start.getTime() + this._duration_in_days * 24 * 60 * 60 * 1000);
        return estimatedEnd;
    }


    get company(): string {
        return this._company;
    }

    get id(): string {
        return this._name.split(' ').join('_');
    }

    // TODO
    get logo(): string {
        for (let logo of this.logolist) {
            if (this.company.toLowerCase().indexOf(logo) !== -1) {
                return logo;
            }
        }

        if (this.company.toLowerCase().indexOf('nestl') !== -1) {
            return 'nestle';
        } 
        if (this.company.toLowerCase().indexOf('touring') !== -1) {
            return 'tcs';
        } 
        
        return 'nologo';
    }





}