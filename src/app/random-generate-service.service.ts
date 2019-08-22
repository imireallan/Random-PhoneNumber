import { Injectable } from '@angular/core';
import { PhoneNumber } from './shared/phone-number';

@Injectable({
  providedIn: 'root'
})
export class RandomGenerateServiceService {
  maxNumber: number;
  minNumber: number;
  phoneNumberList: PhoneNumber[];

  private randomNumberGenerator(): number {
    return Math.floor(Math.random() * (1000000000 - 100000000)) + 100000000;
  }

  public generatePhoneNumbers(quantity: number): void {
    this.phoneNumberList = [];
    const phoneNumbers = [];
    let i: number;

    for (i = 0; i < quantity; i++) {
      let phoneNumber = this.randomNumberGenerator();
      if (phoneNumbers.includes(phoneNumber)) {
        phoneNumber = this.randomNumberGenerator();
      }
      phoneNumbers.push(phoneNumber);
      this.phoneNumberList.push({
        id: i + 1,
        number: '0'.concat(phoneNumber.toString())
      });
    }

    this.maxNumber = Math.max(...phoneNumbers);
    this.minNumber = Math.min(...phoneNumbers);
  }
}
