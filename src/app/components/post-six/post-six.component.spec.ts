import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostSixComponent } from './post-six.component';

describe('PostSixComponent', () => {
  let component: PostSixComponent;
  let fixture: ComponentFixture<PostSixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostSixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
