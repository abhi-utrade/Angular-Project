import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepthScalperComponent } from './depth-scalper.component';

describe('DepthScalperComponent', () => {
  let component: DepthScalperComponent;
  let fixture: ComponentFixture<DepthScalperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepthScalperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepthScalperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
