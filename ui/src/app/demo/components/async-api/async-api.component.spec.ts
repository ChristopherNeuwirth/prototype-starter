import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncApiComponent } from './async-api.component';

describe('AsyncApiComponent', () => {
  let component: AsyncApiComponent;
  let fixture: ComponentFixture<AsyncApiComponent>;

  beforeEach(async(() => {
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
