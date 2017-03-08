import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './email.validator';
import { Component, OnInit, Input } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-contactform',
  templateUrl: 'contactform.component.html',
  styleUrls: ['contactform.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() selectedPlan: string;

  private formspreeUrl = 'https://formspree.io/littleboris@gmail.com';

  private data: FormGroup;

  private _submitFailed = false;

  private _formSent = false;

  constructor(private _http: Http, private _fb: FormBuilder) { }

  ngOnInit() {
    this.data = this._fb.group({
      name : ['', Validators.required],
      company : [''],
      email : ['', Validators.compose([Validators.required, EmailValidator.email])],
      message : ['', Validators.required],
      ratePlan : ['']
    });
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {

    value.ratePlan = this.selectedPlan;
    let bodyString = JSON.stringify(value);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });


    this._http.post(this.formspreeUrl, bodyString, options)
      .map((res: Response) => res.json())
      .subscribe((data) => {
        this._formSent = true;
      }, (err) => {
        this._submitFailed = true;
      }, () => {
      });


  }
}


