import { TestBed, inject } from '@angular/core/testing';

import { FormSpreeService } from './form-spree.service';

describe('FormSpreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormSpreeService]
    });
  });

  it('should ...', inject([FormSpreeService], (service: FormSpreeService) => {
    expect(service).toBeTruthy();
  }));
});
