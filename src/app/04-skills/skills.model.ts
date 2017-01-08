export class Skill {


    public static fromJson(json: any): Skill {
        return new Skill(json.name, json.confidence ? json.confidence : 5, json.daysDone ,
        json.linkedInScore , json.interest ? json.interest : 5, json.lastTimeSeen, json.nbOfProjects);
    }


    constructor(private _name: string, protected _confidence = 0, protected _daysDone = 0,
        protected _linkedInScore = 0, protected _interest = 0, protected _lastTimeSeen = 0, protected _nbOfProjects = 0) { };

    get name(): string {
        return this._name;
    }

    get confidence(): number {
        return this._confidence;
    }

    get daysDone(): number {
        return this._daysDone;
    }

    get linkedInScore(): number {
        return this._linkedInScore;
    }

    get interest(): number {
        return this._interest;
    }

    get lastTimeSeen(): number {
        return this._lastTimeSeen;
    }

    get nbOfProjects(): number {
        return this._nbOfProjects;
    }


}

export class SkillCriteria extends Skill {


    constructor() {
        super(null, 0, 0, 0, 0, 0);
    };


    get linkedInScore(): number {
        return this._linkedInScore;
    }

    set linkedInScore(linkedInScore: number) {
        this._linkedInScore = linkedInScore;
    }

    get nbOfProjects(): number {
        return this._nbOfProjects;
    }

    set nbOfProjects(nbOfProjects: number) {
        this._nbOfProjects = nbOfProjects;
    }

    get confidence(): number {
        return this._confidence;
    }

    set confidence(confidence: number) {
        this._confidence = confidence;
    }

    get daysDone(): number {
        return this._daysDone;
    }

    set daysDone(daysDone: number) {
        this._daysDone = daysDone;
    }

    get interest(): number {
        return this._interest;
    }

    set interest(interest: number) {
        this._interest = interest;
    }

    get lastTimeSeen(): number {
        return this._lastTimeSeen;
    }

    set lastTimeSeen(lastTimeSeen: number) {
        this._lastTimeSeen = lastTimeSeen;
    }



}
