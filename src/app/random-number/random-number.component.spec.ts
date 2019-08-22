import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomNumberComponent } from './random-number.component';
import { PhoneNumber } from '../shared/phone-number';
import { RandomGenerateServiceService } from '../random-generate-service.service';
import { SaveToSheetService } from '../save-to-sheet.service';
import {
  MatCardModule,
  MatGridListModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatPaginatorModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

class MockRandomNumberService {
  formattedPhoneNumber: PhoneNumber[];
  maxNumber: number;
  minNumber: number;

  generatePhoneNumbers(quantity: number): void {
    this.formattedPhoneNumber = [{ id: 1, number: '0987654325' }];
    this.maxNumber = 987654325;
    this.minNumber = 987654325;
  }
}

class MockSaveToSheetsService {
  exportDataToExcel() {
    return 'success';
  }
}

describe('RandomNumberComponent', () => {
  let component: RandomNumberComponent;
  let fixture: ComponentFixture<RandomNumberComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RandomNumberComponent],
      providers: [
        RandomNumberComponent,
        {
          provide: RandomGenerateServiceService,
          useClass: MockRandomNumberService
        },
        { provide: SaveToSheetService, useClass: MockSaveToSheetsService }
      ],
      imports: [
        BrowserAnimationsModule,
        MatCardModule,
        MatGridListModule,
        MatTableModule,
        MatInputModule,
        MatSortModule,
        ReactiveFormsModule,
        MatPaginatorModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomNumberComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a mat-card containing the input and generate buttons', () => {
    const matCardElement = debugElement.query(By.css('mat-card'));
    const matCard: HTMLElement = matCardElement.nativeElement;
    expect(matCard.childElementCount).toBe(2);
  });

  it('should render title in element with class mat-card-tile', () => {
    const matCardTitle: HTMLElement = debugElement.query(
      By.css('mat-card-title')
    ).nativeElement;
    expect(matCardTitle.textContent).toContain('Random PhoneNumber');
  });

  it('should have empty data source on initialization', () => {
    expect(component.dataSource.data.length).toBe(0);
  });

  // it('should populate data source when button is clicked', () => {
  //   component.phoneNumberControls.setValue(4);
  //   fixture.detectChanges();
  //   const card: HTMLElement = debugElement.query(By.css('mat-card'))
  //     .nativeElement;
  //   card.querySelector('button').click();
  //   expect(component.dataSource.data).toContain({
  //     id: 1,
  //     number: '0987654325'
  //   });
  // });

  // it('should populate table when datasource has value', () => {
  //   component.generatePhoneNumbers();
  //   fixture.detectChanges();
  //   const tableElement: HTMLElement = debugElement.nativeElement;
  //   console.log('table', tableElement);

  //   const table = tableElement.querySelector('table');
  //   console.log('table', table);
  //   // Expect one row since 1 data item has been added
  //   expect(table.querySelector('tbody').childElementCount).toBe(1);
  // });

  it('should show error if input data is above 10000', () => {
    component.phoneNumberControls.setValue(100000);
    fixture.detectChanges();
    expect(component.phoneNumberControls.hasError('max')).toBe(true);
  });
});
