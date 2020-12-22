import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsyncApiComponent } from './async-api.component';

describe('AsyncApiComponent', () => {
  let component: AsyncApiComponent;
  let fixture: ComponentFixture<AsyncApiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
