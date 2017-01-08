import { addItemsToRouteProperties } from '@angular-cli/ast-tools/src';
export class Project {

    public static fromJson(totalExperienceDays: number, estimatedStart: Date, project: any): Project {
        let techSkills = [];
        let bizSkills = [];
        let projectDays = 0;

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

        return new Project(project.name, Project.toArray(project.description), Project.toArray(project.roles),
            techSkills,
            bizSkills,
            estimatedStart,
            projectDays);
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
        private _duration_in_days: number) { };


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



}