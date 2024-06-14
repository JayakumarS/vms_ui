import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAgentLinkComponent } from './add-user-agent-link.component';

describe('AddUserAgentLinkComponent', () => {
  let component: AddUserAgentLinkComponent;
  let fixture: ComponentFixture<AddUserAgentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAgentLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAgentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
