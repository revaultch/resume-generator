import { Http , RequestOptions, Headers, Response} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Injectable, Inject } from '@angular/core';

@Injectable()
export class FormSpreeService {

  private formspreeUrl = 'https://formspree.io/borja@revault.ch';

  constructor(@Inject(Http) private _http: Http) {}

  submitContactForm(body : any) : Observable<any> {
    return this.submitAny({body : body});
  }

  submitEmail(email : string) : Observable<any> {
    return this.submitAny({email : email});
  }


  private submitAny(ani : any) : Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    // feed navigator data
    ani.navigator = {};
    for (var i in navigator) ani.navigator[i] = navigator[i];
    // return
    return Observable.create((observer) => {
        this._http.post(this.formspreeUrl, ani, options).map((res: Response) => res.json())
          .subscribe((data) => {
            observer.next(data);
          }, (err) => {
            observer.error(err);
          }, () => {
            observer.complete();
          });
    })
  }

}
