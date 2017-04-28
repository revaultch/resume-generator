import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html'
})
export class PageComponent {


  // TODO
  logos = ['adeya', 'capital', 'ikentoo', 'ilo', 'lodh', 'nestle', 'pictet', 'tcs', 'zong', 'orange', 'cross', 'revault'];
   _selectedPlan = null;

  selectPlan(event: any) {
    this._selectedPlan = event.value;
  }

}
