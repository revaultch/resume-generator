import { i18nService } from '../common/directives/i18n.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Rate, Period } from './ratebox/rate.model';

@Component({
    selector: 'app-rates',
    templateUrl: 'rates.component.html',
    styleUrls: ['rates.component.scss']
})
export class RatesComponent implements OnInit {

    @Output() selected = new EventEmitter();

    private _selectedRateplan: Rate;

    _remotingRate;

    _onsiteRate;

    _simpleWebsite;

    _advancedWebsite;

    _proWebsite;


    constructor(private _i18nService: i18nService) { }


    private _remotingRate_en = new Rate('remoting', 0, Period.DAY, 'Good if you need a full-stack developer but you are on the budget', [
        'World class Java / Angular2 full-stack development',
        'Daily online progress reporting',
        'Weekly on-site reporting'
    ]);


    private _onsiteRate_en = new Rate('on-site', 0, Period.DAY, 'Perfect in case you need some help on an existing project', [
        'World class Java / Angular2 full-stack development',
        'On-Site full / partial time',
        'Benefit from my project mgmt / agile skills'
    ]);


    private _simpleWebsite_en = new Rate('simple website', 0, Period.OTHER, 'You want to build your online presence', [
        'Hassle-free turnkey solution',
        'Graphic design',
        'Web publishing',
        'Social network integration',
        'On-Page SEO and Google Analytics integration',
        'MailChimp integration'
    ]);

    private _advancedWebsite_en = new Rate('advanced website', 0, Period.OTHER, 'You want to attract online traffic to your business', [
        'Simple website features included',
        'Static Blog design / installation',
        'Off-Page SEO techniques course'
    ]);

    private _proWebsite_en = new Rate('professional website', 0, Period.OTHER, 'You need to expose your data or sell your stuff online.', [
        'Advanced website features included',
        'Database design and custom templating',
        'Shop / Payment solution integration'
    ]);




    /////// FR //////


    private _remotingRate_fr = new Rate('?? distance', 0, Period.DAY, 'Bon si vous avez besoin d\'un d??veloppeur complet, mais vous ??tes limit?? par le budget', [
        'D??veloppement Java / Angular2 de classe mondiale !',
        'Rapports d\'activit?? quotidiens en ligne',
        'Rapports hebdomadaires sur site'
    ]);


    private _onsiteRate_fr = new Rate('sur site', 0, Period.DAY, 'Parfait si vous avez besoin d\'aide sur un projet existant', [
        'D??veloppement Java / Angular2 de classe mondiale !',
        'Temps plein / partiel sur place',
        'Profitez de mes comp??tences en gestion de projet / agilit??'
    ]);


    private _simpleWebsite_fr = new Rate('site web simple', 0, Period.OTHER, 'Vous voulez une pr??sence en ligne', [
        'Solution cl?? en main sans tracas',
        'Design graphique',
        'Publication web',
        'Int??gration r??seaux sociaux',
        'On-Page SEO et Int??gration Google Analytics',
        'Integration MailChimp'
    ]);

    private _advancedWebsite_fr = new Rate('site web avanc??', 0, Period.OTHER, 'Vous voulez attirer des clients sur votre site', [
        'Fonctionnalit??s site web simple comprises',
        'Installation et design d\'un blog',
        'Cours SEO Off-Page'
    ]);

    private _proWebsite_fr = new Rate('site web professionnel', 0, Period.OTHER, 'Vous voulez exposer vos donn??es et/ou vendre en ligne', [
        'Fonctionnalit??s site web avanc?? comprises',
        'Conception base de donn??es et mod??les personnalis??s',
        'Integration shop en ligne / paiement'
    ]);



    ngOnInit() {
        if (this._i18nService.getLanguage() === 'fr') {
            this._remotingRate = this._remotingRate_fr;
            this._onsiteRate = this._onsiteRate_fr;
            this._simpleWebsite = this._simpleWebsite_fr;
            this._advancedWebsite = this._advancedWebsite_fr;
            this._proWebsite = this._proWebsite_fr;
        } else {
            this._remotingRate = this._remotingRate_en;
            this._onsiteRate = this._onsiteRate_en;
            this._simpleWebsite = this._simpleWebsite_en;
            this._advancedWebsite = this._advancedWebsite_en;
            this._proWebsite = this._proWebsite_en;
        }
    }


    selectRate(rate: Rate) {
        this._selectedRateplan = rate;
        this.selected.emit({ value: rate });
    }

    isSelected(rate: Rate) {
        return rate === this._selectedRateplan;
    }


}


