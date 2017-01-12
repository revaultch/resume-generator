import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-rates',
    templateUrl: './rates.component.html',
    styleUrls: ['./rates.component.scss']
})
export class RatesComponent implements OnInit {


    public technologyRating: number = 50;

    public environmentRating: number = 50;

    public distanceRating: number = 50;

    public durationRating: number = 50;

    result: number = 0;


    refreshRate() {
        this.result = Math.floor(1200 - this.rateFactor() * 600.0);
    }

    private rateFactor() {
        return ((this.technologyRating / 100.0) * 0.3 +
            (this.environmentRating / 100.0) * 0.2 +
            (this.distanceRating / 100.0) * 0.2 +
            (this.durationRating / 100.0) * 0.3);
    }

    ngOnInit() {
        this.refreshRate();
    }



}