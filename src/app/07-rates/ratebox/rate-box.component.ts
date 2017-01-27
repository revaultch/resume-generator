import {
    Component, Input, Output, EventEmitter, Inject, ChangeDetectionStrategy
} from '@angular/core';

import {Rate, Period, PeriodAware} from './rate.model';
import {i18nService} from '../../common/directives/i18n.service';

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

    constructor(@Inject(i18nService) private _i18nService: i18nService) {
    }

    selectPlan() {
        this.selected.emit({value : this.rate});
    }

// {{rate.period === Period.DAY ? '/ day' : ''}}
    getRatePeriod() {
        return this.rate.period == Period.DAY ? this._i18nService.translate('/ day^/ jour') : '';
    }

}

