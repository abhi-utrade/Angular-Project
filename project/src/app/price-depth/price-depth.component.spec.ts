import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceDepthComponent } from './price-depth.component';

describe('PriceDepthComponent', () => {
  let component: PriceDepthComponent;
  let fixture: ComponentFixture<PriceDepthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceDepthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceDepthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
