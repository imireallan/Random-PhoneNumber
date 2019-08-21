import { TestBed } from '@angular/core/testing';

import { SaveToSheetService } from './save-to-sheet.service';

describe('SaveToSheetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveToSheetService = TestBed.get(SaveToSheetService);
    expect(service).toBeTruthy();
  });
});
