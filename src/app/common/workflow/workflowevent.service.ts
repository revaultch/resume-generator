import { WorkflowEvent } from './workflowevent.model';
import { WindowRef } from '../window/windowref.service';
import { Injectable, Inject, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WorkflowEventReceiver } from './workfloweventreceiver.model';
import { EnterViewportWorkflowEvent, ExitViewportWorkflowEvent, InViewportWorkflowEvent } from './workflowevent.model';

@Injectable()
export class WorkflowEventService {

    constructor(private _windowRef: WindowRef) {
    }


    public getWorkflowEvents(workflowEventReceiver: WorkflowEventReceiver): Observable<WorkflowEvent> {
        let receiverStateMachine = new StateMachine();
        let state = ReceiverState.OUT;
        let nativeElement = workflowEventReceiver.getElementRef().nativeElement;
        let rect = workflowEventReceiver.getElementRef().nativeElement.getBoundingClientRect();
        let window = this._windowRef.nativeWindow;
        let lastGeometry = null;

        let obs = Observable.fromEvent(this._windowRef.nativeWindow, 'scroll')
            .filter((value, index) => {
                rect = nativeElement.getBoundingClientRect();
                lastGeometry = GeometryUtils.getCurrentGeometry(rect, window);
                state = receiverStateMachine.next(lastGeometry);
                if (state === ReceiverState.OUT) {
                    return false;
                } else if (state === ReceiverState.IN) {
                    return true;
                } else if (state === ReceiverState.ENTER) {
                    return true;
                } else if (state === ReceiverState.EXIT) {
                    return true;
                }
            })
            .map((event) => {
                if (state === ReceiverState.ENTER) {
                    return new EnterViewportWorkflowEvent();
                } else if (state === ReceiverState.IN) {
                    return new InViewportWorkflowEvent(GeometryUtils.isTotallyVisible(lastGeometry),
                        GeometryUtils.calcCoverageInPercent(lastGeometry),
                        GeometryUtils.getMiddlePositionInPercent(lastGeometry));
                } else if (state === ReceiverState.EXIT) {
                    return new ExitViewportWorkflowEvent();
                } else {
                    throw Error('illegal state');
                }
            });

        obs.subscribe((event) => {
            if (event instanceof EnterViewportWorkflowEvent) {
                workflowEventReceiver.handleWorkflowEnter(event);
            } else if (event instanceof InViewportWorkflowEvent) {
                workflowEventReceiver.handleWorkflowIn(event);
            } else if (event instanceof ExitViewportWorkflowEvent) {
                workflowEventReceiver.handleWorkflowExit(event);
            } else {
                throw Error('Unknown event type');
            }
        });

        return obs;

    }


}

enum ReceiverState {
    OUT,
    ENTER,
    IN,
    EXIT
}

class StateMachine {

    private _receiverState = ReceiverState.OUT;

    constructor() { }

    next(geometry: Geometry): ReceiverState {
        let visible = this.isPartiallyVisible(geometry);
        if (visible) {
            if (this._receiverState === ReceiverState.OUT) {
                this._receiverState = ReceiverState.ENTER;
            } else if (this._receiverState === ReceiverState.ENTER) {
                this._receiverState = ReceiverState.IN;
            }
        } else {
            if (this._receiverState === ReceiverState.IN) {
                this._receiverState = ReceiverState.EXIT;
            } else {
                this._receiverState = ReceiverState.OUT;
            }
        }
        return this._receiverState;
    }

    private isPartiallyVisible(geometry: Geometry): boolean {
        return GeometryUtils.isPartiallyVisible(geometry);
    }



}

class GeometryUtils {

    static getCurrentGeometry(rect: any, window: any) {
        let winHeight = (window.innerHeight || window.document.documentElement.clientHeight);
        return new Geometry(rect.top, rect.bottom, winHeight);
    }

    static isPartiallyVisible(geometry: Geometry): boolean {
        return (
            geometry.rectTop >= 0 && geometry.rectTop <= geometry.winHeight || // case 1
            geometry.rectBottom >= 0 && geometry.rectBottom <= geometry.winHeight || // case 2
            geometry.rectTop < 0 && geometry.rectBottom > geometry.winHeight // case 3
        );
    }

    static calcCoverageInPercent(geometry: Geometry): number {
        let result = 100.0;
        result = result - (geometry.rectTop > 0 ? (geometry.rectTop * 100 / geometry.winHeight) : 0);
        result = result - (geometry.rectBottom < geometry.winHeight
            ? ((geometry.winHeight - geometry.rectBottom) * 100 / geometry.winHeight)
            : 0);
        return result;
    }

    static isTotallyVisible(geometry: Geometry) {
        return geometry.rectTop >= 0 && geometry.rectTop <= geometry.winHeight &&
            geometry.rectBottom >= 0 && geometry.rectBottom <= geometry.winHeight;
    }

    static getMiddlePositionInPercent(geometry: Geometry): number {
        let middle = geometry.rectTop + ((geometry.rectBottom - geometry.rectTop) / 2);
        return middle * 100.0 / geometry.winHeight;
    }
}


class Geometry {


    constructor(private _rectTop: number, private _rectBottom: number, private _winHeight: number) { }

    get rectTop(): number {
        return this._rectTop;
    }

    get rectBottom(): number {
        return this._rectBottom;
    }

    get winHeight(): number {
        return this._winHeight;
    }

}
