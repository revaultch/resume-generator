import {
    Component, Input, Output, EventEmitter, Inject, ChangeDetectionStrategy
} from '@angular/core';

import {Rate, Period, PeriodAware} from './rate.model';

@Component({
    selector: 'app-ratebox',
    templateUrl: './rate-box.component.html',
    styleUrls: ['./rate-box.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
@PeriodAware
export class RateBoxComponent {

    @Input() rate: Rate;
    @Input() isSelected: boolean = false;
    @Output() selected = new EventEmitter();

    constructor() {
    }

    selectPlan() {
        this.selected.emit({value : this.rate});
    }

}

