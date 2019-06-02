import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelReqeustPage } from './add-travel-reqeust.page';

describe('AddTravelReqeustPage', () => {
  let component: AddTravelReqeustPage;
  let fixture: ComponentFixture<AddTravelReqeustPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTravelReqeustPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTravelReqeustPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
