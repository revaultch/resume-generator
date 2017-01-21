export class WorkflowEvent {

}

export class EnterViewportWorkflowEvent extends WorkflowEvent {

}

export class InViewportWorkflowEvent extends WorkflowEvent {
    constructor(private _isTotallyVisible: boolean, private _coverageInPercent: number, private _middlePositionInPercent) {
        super();
    }

    get isTotallyVisible(): boolean {
        return this._isTotallyVisible;
    }

    get coverageInPercent() {
        return this._coverageInPercent;
    }

    get middlePositionInPercent() {
        return this._middlePositionInPercent;
    }
}

export class ExitViewportWorkflowEvent extends WorkflowEvent {

}

