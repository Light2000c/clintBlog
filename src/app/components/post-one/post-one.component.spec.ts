import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOneComponent } from './post-one.component';

describe('PostOneComponent', () => {
  let component: PostOneComponent;
  let fixture: ComponentFixture<PostOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostOneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
