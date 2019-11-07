import { TestBed } from '@angular/core/testing';

import { FormDataServiceService } from './form-data-service.service';

describe('FormDataServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormDataServiceService = TestBed.get(FormDataServiceService);
    expect(service).toBeTruthy();
  });
});
