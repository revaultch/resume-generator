import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from './email.validator';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { Http, Headers, Request, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { FormSpreeService } from '../common/services/formspree/form-spree.service';

@Component({
  selector: 'app-contactform',
  templateUrl: 'contactform.component.html',
  styleUrls: ['contactform.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() selectedPlan: string;

  data: FormGroup;

  _submitFailed = false;

  _formSent = false;

  constructor( @Inject(FormSpreeService) private _formSpreeService, private _http: Http, private _fb: FormBuilder) { }

  ngOnInit() {
    this.data = this._fb.group({
      name: ['', Validators.required],
      company: [''],
      email: ['', Validators.compose([Validators.required, EmailValidator.email])],
      message: ['', Validators.required],
      ratePlan: ['']
    });
  }

  onSubmit({ value, valid }: { value: any, valid: boolean }) {

    value.ratePlan = this.selectedPlan;
    
    let bodyString = JSON.stringify(value);

    this._formSpreeService.submitContactForm(bodyString).subscribe((data) => {
      this._formSent = true;
    }, (err) => {
      this._submitFailed = true;
    }, () => {
    })

  }
}


