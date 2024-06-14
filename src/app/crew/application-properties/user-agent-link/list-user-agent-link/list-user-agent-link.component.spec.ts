import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserAgentLinkComponent } from './list-user-agent-link.component';

describe('ListUserAgentLinkComponent', () => {
  let component: ListUserAgentLinkComponent;
  let fixture: ComponentFixture<ListUserAgentLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserAgentLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUserAgentLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
