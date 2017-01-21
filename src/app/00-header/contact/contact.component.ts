import { Component, Input, OnInit } from '@angular/core';

import '../../../ext/skype/skype-uri.js';
declare var Skype: any;

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {


  @Input() mode;


  skype() {
    Skype.tryAnalyzeSkypeUri('chat', '0');
  }



}
