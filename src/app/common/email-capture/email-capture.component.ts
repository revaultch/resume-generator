import { Observable } from 'rxjs/Rx';

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
    const delay = 25000; // 25 seconds
    Observable.timer(delay).subscribe((item) => {
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
  }

}
