import { TestBed } from '@angular/core/testing';

import { AskNameGuard } from './ask-name.guard';

describe('AskNameGuard', () => {
  let guard: AskNameGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AskNameGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
