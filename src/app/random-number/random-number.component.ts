import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PhoneNumber } from '../shared/phone-number';

const PHONE_NUMBER_DATA: PhoneNumber[] = [
  { id: 1, number: '0302689639' },
  { id: 2, number: '0562728162' },
  { id: 3, number: '0302689639' },
  { id: 4, number: '0302689639' },
  { id: 5, number: '0302689639' },
  { id: 6, number: '0302689639' },
  { id: 7, number: '0302689639' }
];

@Component({
  selector: 'app-random-number',
  templateUrl: './random-number.component.html',
  styleUrls: ['./random-number.component.scss']
})
export class RandomNumberComponent implements OnInit {
  constructor() {}
  displayedColumns: string[] = ['id', 'number'];
  datasource = PHONE_NUMBER_DATA;
  totalPhoneNumbers = 5;
  maxNumber = '03433353';
  minNumber = '0111111';


  phoneNumberControls = new FormControl('', [
    Validators.required,
    Validators.max(10000)
  ]);

  getError(): string {
    if (this.phoneNumberControls.getError('max')) {
      return 'can generate 10,000 numbers at a time';
    }
    if (this.phoneNumberControls.getError('required')) {
      return 'field cannot be blank';
    }
  }

  ngOnInit() {}
}
