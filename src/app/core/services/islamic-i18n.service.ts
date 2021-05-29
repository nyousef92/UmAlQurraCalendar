import { Injectable } from '@angular/core';
import { NgbDatepickerI18n, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
const ARWEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const ENWEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sau', 'Sun'];

// const ARMONTHS = ['01', '02', ' 03', ' 04', ' 05', ' 06', '07', '08', '09', '10', '11', '12'];
// const ENMONTHS = ['01', '02', ' 03', ' 04', ' 05', ' 06', '07', '08', '09', '10', '11', '12'];
const ARMONTHS = [
  'محرم',
  'صفر',
  'ربيع الأول',
  'ربيع الآخر',
  'جمادى الأولى',
  'جمادى الآخرة',
  'رجب',
  'شعبان',
  'رمضان',
  'شوال',
  'ذو القعدة',
  'ذو الحجة'
];
const ENMONTHS = ['Moharram', 'Safar', 'Rabi al-Awwal', 'Rabi al-Thani', 'Jumādá al-Ūlá',
'Jumādá al-Ākhirah', 'Rajab', 'Shabaan', 'Ramadan', 'Shawwal', 'Dhū al-Qa‘dah', 'Dhū al-Ḥijjah'];

@Injectable({
  providedIn: 'root'
})
export class IslamicI18nService extends NgbDatepickerI18n {

  constructor(
    public translate: TranslateService
  ) {
    super();
  }
  getWeekdayShortName(weekday: number) {
    return this.translate.currentLang === 'ar' ?
      ARWEEKDAYS[weekday - 1] :
      ENWEEKDAYS[weekday - 1];

  }

  getMonthShortName(month: number) {
    return this.translate.currentLang === 'ar' ?
      ARMONTHS[month - 1] :
      ENMONTHS[month - 1];

  }

  getMonthFullName(month: number) {
    return this.translate.currentLang === 'ar' ?
      ARMONTHS[month - 1] :
      ENMONTHS[month - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }

}
