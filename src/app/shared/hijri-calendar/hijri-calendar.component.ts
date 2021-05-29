import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbCalendar, NgbDatepickerI18n, NgbDateAdapter, NgbDateParserFormatter, NgbCalendarIslamicUmalqura, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { IslamicI18nService } from '../../core/services/islamic-i18n.service';
import { CustomAdapter } from '../../core/services/custom-adapter.service';
import { CustomDateParserFormatter } from '../../core/services/custom-date-parser-formatter.service';

@Component({
  selector: 'app-hijri-calendar',
  templateUrl: './hijri-calendar.component.html',
  providers: [
    { provide: NgbDatepickerI18n, useClass: IslamicI18nService },
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDateAdapter, useClass: CustomAdapter },
    { provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter }
  ]
})
export class HijriCalendarComponent implements OnInit, OnChanges {
  model: any;
  @Output() dateSelect: EventEmitter<string> = new EventEmitter<string>();
  sperator = '-';
  // when you have the value already selected and you want to bind it with the model
  @Input() selectedDate: string;
  // the lable you want to give to the field
  @Input() label: string;
  // when you want to set the max date using a static differance values from today
  // exaple : max age 18 years exxpiry date is in the next 3 days
  @Input() maxDateDeffirance: { year: number, month: number, day: number };
  // when you want to set the max date using a static date
  // exaple : max date is untill 31/12/2021
  @Input() maxDate: NgbDate;
  // when you want to set the min date using a static differance values from today
  // exaple : min age 18 years issue date is in the 3 past days
  @Input() minDateDifferance: { year: number, month: number, day: number };
  // when you want to set the max date using a static date
  // exaple : max date is not less than 31/12/2021
  @Input() minDate: NgbDate;

  constructor(
    private calendar: NgbCalendar
  ) { }

  ngOnInit(): void {
    this.setMinAndMax();
    this.setValue();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.model = changes.selectedDate?.currentValue;
  }
  setMinAndMax(): void {
    const today = this.calendar.getToday();
    if (!this.maxDateDeffirance) {
      if (!this.maxDate) {
        this.maxDate = new NgbDate(1500, 12, 29);
      }
    } else {
      this.maxDate = new NgbDate(
        today.year + this.maxDateDeffirance.year,
        today.month + this.maxDateDeffirance.month,
        today.day + this.maxDateDeffirance.day
      );
    }
    if (!this.minDateDifferance) {
      if (!this.minDate) {
        this.minDate = new NgbDate(1300, 1, 1);
      }
    } else {
      this.minDate = new NgbDate(
        today.year + this.minDateDifferance.year,
        today.month + this.minDateDifferance.month,
        today.day + this.minDateDifferance.day
      );
    }
  }
  setValue(): void {
    if (this.selectedDate) {
      const dateParams = this.selectedDate.split(this.sperator);
      this.model = new NgbDate(
        parseInt(dateParams[2], 10),
        parseInt(dateParams[1], 10),
        parseInt(dateParams[0], 10)
      );
      const day = this.model.day < 10 ? '0' + String(this.model.day) : String(this.model.day);
      const month = this.model.month < 10 ? '0' + String(this.model.month) : String(this.model.month);
      const year = String(this.model.year);
      this.model = day + this.sperator + month + this.sperator + year;

    } else {
      this.model = null;
    }
  }
  onDateSelect(date: NgbDate): void {
    const day = date.day < 10 ? '0' + String(date.day) : String(date.day);
    const month = date.month < 10 ? '0' + String(date.month) : String(date.month);
    const year = String(date.year);
    this.dateSelect.emit(
      day + this.sperator + month + this.sperator + year
    );
  }
}
