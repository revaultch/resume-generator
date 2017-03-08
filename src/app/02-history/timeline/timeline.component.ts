import { ChangeDetectionStrategy, Component, Input, OnChanges } from '@angular/core';
import { Project } from '../../common/project.model';

@Component({
  selector: 'app-timeline',
  templateUrl: 'timeline.component.html',
  styleUrls: ['timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimelineComponent implements OnChanges {

  @Input() start: Date;
  @Input() end: Date;
  @Input() focus: Project;
  @Input() isInViewport: boolean;

  _years: Array<Year>;

  _focusEnd: number = 0;

  _focusLength: number = 0;

  private calcTimePercent(value: number) {
    return (value - this.start.getTime()) * 100 / (this.end.getTime() - this.start.getTime());
  }

  calcFocusStart() {
    return this.focus != null ? this.calcTimePercent(this.focus.estimatedStart.getTime()) : 0;
  }

  calcFocusEnd() {
    return this.focus != null ? this.calcTimePercent(this.focus.estimatedEnd.getTime()) : 0;
  }

  calcFocusLength() {
    return this.focus != null ? this.calcFocusEnd() - this.calcFocusStart() : 0;
  }

  calcYears() {
    let result = new Array<Year>();
    for (let y = this.start.getFullYear(); y <= this.end.getFullYear(); y++) {
      result.push(new Year(y, this.calcTimePercent(new Date(y, 0, 1).getTime())));
    }
    return result;
  }

  isTerminal(year: Year) {
    return year.value === this._years[0].value || year.value === this._years.reverse()[0].value;
  }

  ngOnChanges(changes: any) {
    this._focusEnd = this.calcFocusEnd();
    this._focusLength = this.calcFocusLength();
    this._years = this.calcYears();
  }



}

class Year {

  constructor(private _value: number, private _position: number) { }

  get value(): number {
    return this._value;
  }

  get position(): number {
    return this._position;
  }

}
