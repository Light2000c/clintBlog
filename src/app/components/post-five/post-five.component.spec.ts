import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFiveComponent } from './post-five.component';

describe('PostFiveComponent', () => {
  let component: PostFiveComponent;
  let fixture: ComponentFixture<PostFiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostFiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
