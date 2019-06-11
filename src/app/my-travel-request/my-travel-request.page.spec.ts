import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTravelRequestPage } from './my-travel-request.page';

describe('MyTravelRequestPage', () => {
  let component: MyTravelRequestPage;
  let fixture: ComponentFixture<MyTravelRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTravelRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTravelRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
