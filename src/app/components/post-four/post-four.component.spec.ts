import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFourComponent } from './post-four.component';

describe('PostFourComponent', () => {
  let component: PostFourComponent;
  let fixture: ComponentFixture<PostFourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostFourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
