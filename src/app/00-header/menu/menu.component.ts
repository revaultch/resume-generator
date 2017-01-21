import { Component, Input, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewInit {

  @Input() mode;


  initScrollTo() {
    let container = $('body,html');

    let scrollTo = function (destination) {
      let target = $(destination);
      container.animate({
        scrollTop: target.offset().top - container.offset().top // + container.scrollTop()
      });
    };
    $('*[data-destination]').each(function (index) {
      $(this).on('click', function (e) {
        let destination = $(this).data('destination');
        if (destination) {
          scrollTo(destination);
        }
      });
    });

  }

  ngAfterViewInit() {
    this.initScrollTo();
  }


}
