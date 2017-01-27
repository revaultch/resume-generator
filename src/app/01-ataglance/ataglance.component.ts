import { Component, Inject } from '@angular/core';
import {i18nService} from '../common/directives/i18n.service';

@Component({
  selector: 'app-ataglance',
  templateUrl: './ataglance.component.html',
  styleUrls: ['./ataglance.component.scss']
})
export class AtaglanceComponent {

  constructor(@Inject(i18nService) private _i18nService: i18nService) {}

  i18n(content: string) {
    return this._i18nService.translate(content)
  }

}
