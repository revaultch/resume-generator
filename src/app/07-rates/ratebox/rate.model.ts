export class Rate {
    constructor(
    private _name: string,
    private _price: number,
    private _period: Period,
    private _goodFor: string,
    private _packageList: Array<string>) {};

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    get period(): Period {
        return this._period;
    }

    get goodFor(): string {
        return this._goodFor;
    }

    get packageList(): Array<string> {
        return this._packageList;
    }
}

export enum Period {
    DAY,
    OTHER
}

export function PeriodAware(constructor: Function) {
    constructor.prototype.Period = Period;
}