import { Component, Output, EventEmitter } from '@angular/core';
import { Rate, Period } from './ratebox/rate.model';

@Component({
    selector: 'app-rates',
    templateUrl: './rates.component.html',
    styleUrls: ['./rates.component.scss']
})
export class RatesComponent {

    @Output() selected = new EventEmitter();
    private _selectedRateplan: Rate;

    private _remotingRate = new Rate('remoting', 560, Period.DAY, 'Good if you need a full-stack developer but you are on the budget', [
        'World class Java / Angular2 full-stack development',
        'Daily online progress reporting',
        'Weekly on-site reporting'
    ]);


    private _onsiteRate = new Rate('on-site', 750, Period.DAY, 'Perfect in case you need some help on an existing project', [
        'World class Java / Angular2 full-stack development',
        'On-Site full / partial time',
        'Benefit from my project mgmt / agile skills'
    ]);


    private _simpleWebsite = new Rate('simple website', 2900, Period.OTHER, 'You want to build your online presence', [
        'Hassle-free turnkey solution',
        'Graphic design',
        'Web publishing',
        'Social network integration',
        'On-Page SEO and Google Analytics integration',
        'MailChimp integration'
    ]);

    private _advancedWebsite = new Rate('advanced website', 4900, Period.OTHER, 'You want to attract online traffic to your business', [
        'Simple website features included',
        'Static Blog design / installation',
        'Off-Page SEO techniques course'
    ]);

    private _proWebsite = new Rate('professional website', 6900, Period.OTHER, 'You need to expose your data or sell your stuff online.', [
        'Advanced website features included',
        'Database design and custom templating',
        'Shop / Payment solution integration'
    ]);


    selectRate(rate: Rate) {
        this._selectedRateplan = rate;
        this.selected.emit({value : rate});
    }

    isSelected(rate: Rate) {
        return rate === this._selectedRateplan;
    }


}


