import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRejectPage } from './approve-reject.page';

describe('ApproveRejectPage', () => {
  let component: ApproveRejectPage;
  let fixture: ComponentFixture<ApproveRejectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveRejectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveRejectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
