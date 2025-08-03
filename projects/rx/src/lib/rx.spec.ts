import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rx } from './rx';

describe('Rx', () => {
  let component: Rx;
  let fixture: ComponentFixture<Rx>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rx]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Rx);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
