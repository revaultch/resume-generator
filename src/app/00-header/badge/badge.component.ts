import { AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import * as $ from 'jquery';
import * as easing from 'jquery.easing';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent {

  @ViewChild('badge', { read: ViewContainerRef })
  private _badge: any;

  @HostListener('window:load')
  onLoad() {
    $.fn.easing = easing;
    $(this._badge.element.nativeElement)
      .animate(
      { top: 0 },
      {
        duration: 1000,
        easing: 'easeOutElastic'
      });
  }


}
