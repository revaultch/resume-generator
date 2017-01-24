import { AfterViewInit, Component, ViewChild, ViewContainerRef, HostListener } from '@angular/core';
import * as $ from 'jquery';
import * as easing from 'jquery.easing';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements AfterViewInit {

  @ViewChild('badge', { read: ViewContainerRef })
  private _badge: any;

  ngAfterViewInit() {
  }

  @HostListener('window:load')
  onLoad() {
    $.fn.easing = easing;
    $(this._badge.element.nativeElement)
      .animate(
      { top: 0 },
      {
        duration: 'slow',
        easing: 'easeOutElastic'
      });
  }


}
