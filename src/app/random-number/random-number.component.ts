import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RandomGenerateServiceService } from '../random-generate-service.service';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { SaveToSheetService } from '../save-to-sheet.service';

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  displayedColumns: string[] = ['id', 'number'];
  totalPhoneNumbers = 5;
  maxNumber: string;
  minNumber: string;

  dataSource = new MatTableDataSource();

  constructor(
    private randomNumberService: RandomGenerateServiceService,
    private exportExcel: SaveToSheetService
  ) {}

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  phoneNumberControls = new FormControl('', [
    Validators.required,
    Validators.max(10000)
  ]);

  generatePhoneNumbers(): void {
    this.dataSource.data = [];
    this.randomNumberService.generatePhoneNumbers(
      this.phoneNumberControls.value
    );
    this.dataSource.data = this.randomNumberService.phoneNumberList;
    this.maxNumber = '0'.concat(this.randomNumberService.maxNumber.toString());
    this.minNumber = '0'.concat(this.randomNumberService.minNumber.toString());
  }

  getError(): string {
    if (this.phoneNumberControls.getError('max')) {
      return 'can generate 10,000 numbers at a time';
    }
    if (this.phoneNumberControls.getError('required')) {
      return 'field cannot be blank';
    }
  }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  saveToSheet() {
    this.exportExcel.exportDataToExcel(
      [...this.dataSource.data],
      'generated_phone_numbers'
    );
  }
}
