import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsStaticComponent } from './assets-static.component';

describe('AssetsStaticComponent', () => {
  let component: AssetsStaticComponent;
  let fixture: ComponentFixture<AssetsStaticComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetsStaticComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsStaticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
