import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AsyncApiObservableComponent } from './async-api-observable.component';

describe('AsyncApiObservableComponent', () => {
  let component: AsyncApiObservableComponent;
  let fixture: ComponentFixture<AsyncApiObservableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AsyncApiObservableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsyncApiObservableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
