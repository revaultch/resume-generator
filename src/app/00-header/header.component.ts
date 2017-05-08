import { Component, ViewChild, ViewContainerRef, HostListener } from '@angular/core';

import * as $ from 'jquery';
import * as easing from 'jquery.easing';


@Component({
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent {

  @ViewChild('background_lo', { read: ViewContainerRef })
  private _background_lo: any;


  @ViewChild('background', { read: ViewContainerRef })
  private _background: any;


  @HostListener('window:load')
  onWindowLoad() {
    $.fn.easing = easing;
    let bgNative = this._background.element.nativeElement;
    let bgLoNative = this._background_lo.element.nativeElement;
    let imgsrc = '/assets/images/header/background.png';

    $('<img/>').attr('src', imgsrc).on('load', function () {
      $(this).remove(); // prevent memory leaks
      $(bgNative).css('background-image', 'url(' + imgsrc + ')');
    });

    $(bgNative)
      .fadeIn(500, function () { 
        $(bgLoNative).css('display', 'none');
      });

  }



}







