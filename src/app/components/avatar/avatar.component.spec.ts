import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarComponent2 } from './avatar.component';

describe('AvatarComponent2', () => {
  let component: AvatarComponent2;
  let fixture: ComponentFixture<AvatarComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
