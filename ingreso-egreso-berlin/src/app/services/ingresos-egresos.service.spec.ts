import { TestBed } from '@angular/core/testing';

import { IngresosEgresosService } from './ingresos-egresos.service';

describe('IngresosEgresosService', () => {
  let service: IngresosEgresosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresosEgresosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
