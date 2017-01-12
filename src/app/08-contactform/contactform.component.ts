import { Component } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.scss']
})
export class ContactFormComponent {

  private formspreeUrl = 'https://formspree.io/littleboris@gmail.com';

  private data: any = {};

  private dataValid = false;

  private submitFailed = false;

  private done = false;

  constructor(private _http: Http) { }

  onSubmit() {

    let bodyString = JSON.stringify(this.data);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    this._http.post(this.formspreeUrl, bodyString, options)
      .map((res: Response) => res.json())
      .subscribe((data) => {

      }, (err) => {
        this.submitFailed = true;
      }, () => {
      });


  }
}
