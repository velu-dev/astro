import { TestBed } from '@angular/core/testing';

import { AstroService } from './astro.service';

describe('AstroService', () => {
  let service: AstroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AstroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
