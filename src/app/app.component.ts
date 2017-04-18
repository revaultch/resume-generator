import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // TODO
  private logos = ['adeya', 'capital', 'ikentoo', 'ilo', 'lodh', 'nestle', 'pictet', 'tcs', 'zong', 'orange', 'cross', 'revault'];
  private _selectedPlan = null;

  selectPlan(event: any) {
    this._selectedPlan = event.value;
  }

}
