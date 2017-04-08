import { TimerObservable } from '@angular/cli/node_modules/rxjs/observable/TimerObservable';

import { WindowRef } from '../window/windowref.service';
import { FormSpreeService } from '../services/formspree/form-spree.service';
import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';

import * as $ from 'jquery';

@Component({
  selector: 'app-email-capture',
  templateUrl: './email-capture.component.html',
  styleUrls: ['./email-capture.component.scss']
})
export class EmailCaptureComponent implements AfterViewInit, OnInit {

  _email = "";

  _open = false;

  _invalidEmail = false;

  _triggerBookmark;

  constructor( @Inject(FormSpreeService) private _formSpreeService, @Inject(WindowRef) private _windowRef) { }


  private openPopup() {
    this._open = true;
  }

  private closePopup() {
    this._open = false;
  }

  ngOnInit() {
    const delay = 3000; // 30 seconds
    TimerObservable.create(delay).subscribe((item) => {
      this.openPopup();
    });
  }




  ngAfterViewInit() {
    this._triggerBookmark = $("#no-thanks-link"); // It must be an `a` tag
  }

  submitEmail() {
    // TODO service
    const emailRegexp = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (emailRegexp.test(this._email)) {
      this._open = false;
      this._formSpreeService.submitEmail(this._email).subscribe(
        (data) => { },
        (err) => {

        },
        () => {
        });
    } else {
      this._invalidEmail = true;
    }
  }

  noThanks() {
    this.closePopup();
    let window = this._windowRef.nativeWindow;

    if (window.sidebar && window.sidebar.addPanel) { // Firefox <23

      window.sidebar.addPanel(document.title, window.location.href, '');

    } else if (window.external && ('AddFavorite' in window.external)) { // Internet Explorer

      window.external.AddFavorite(location.href, document.title);

    } else if (window.opera && window.print || window.sidebar && !(window.sidebar instanceof Node)) { // Opera <15 and Firefox >23
      /**
       * For Firefox <23 and Opera <15, no need for JS to add to bookmarks
       * The only thing needed is a `title` and a `rel="sidebar"`
       */
      this._triggerBookmark.attr('rel', 'sidebar').attr('title', document.title);
      return true;

    } else { // For the other browsers (mainly WebKit) we use a simple alert to inform users that they can add to bookmarks with ctrl+D/cmd+D

      alert('You can add this page to your bookmarks by pressing ' + (navigator.userAgent.toLowerCase().indexOf('mac') != - 1 ? 'Command/Cmd' : 'CTRL') + ' + D on your keyboard.');

    }

  }

}
