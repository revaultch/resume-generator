import {Project} from './project.model';

export class Experience {


    public static fromJson(experience: any) {
        let experienceStartDate: Date = new Date(experience.start.year, experience.start.month - 1)// 0 based month;
        let experienceEndDate: Date;
        if (experience.end) {
            experienceEndDate = new Date(experience.end.year, experience.end.month, 0) ; // day 0 = last day of previous month
        } else {
            experienceEndDate = new Date();
        }

        let projects: Array<Project> = new Array<Project>();

        let totalExperienceDurationInDays: number = Experience.totalDurationInDays(experienceStartDate, experienceEndDate);
        let cumulatedOffsetInDays = 0;
        for (let p of experience.projects) {


            // calculate project dates
            let projectStartDate = new Date();
            let projectStartOffsetInMs = cumulatedOffsetInDays * 24 * 60 * 60 * 1000;
            projectStartDate.setTime(experienceStartDate.getTime() + projectStartOffsetInMs) ;

            let project = Project.fromJson(experience, totalExperienceDurationInDays,
            projectStartDate,
            p);

            projects.push(project);

            cumulatedOffsetInDays += project.durationInDays;
        }

        return new Experience(experienceStartDate, experienceEndDate, experience.role, experience.company, projects);
    }

    private static totalDurationInDays(from: Date, to: Date): number {
        let t: number = +(to) - +(from);
        return t / (24 * 60 * 60 * 1000);
    }


    private constructor(private _start: Date, private _end: Date,
        private _role: string, private _company: string, private _projects: Array<Project>) { };

    get start(): Date {
        return this._start;
    }

    get end(): Date {
        return this._end;
    }

    get role(): string {
        return this._role;
    }

    get company(): string {
        return this._company;
    }

    get projects(): Array<Project> {
        return this._projects;
    }



}
