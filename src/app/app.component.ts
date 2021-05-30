import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'umAlQurraCalendar';
  constructor(
    private translate: TranslateService
  ) { }
  ngOnInit(): void {
    this.translate.use('ar');
  }
  changeLanguage(): void {
    this.translate.currentLang === 'ar' ?
      this.translate.use('en') :
      this.translate.use('ar');
  }
  onDateSelect(x): void {
    // you can bind the value with fromControl or save it in a variable
    // here I will just log it
    console.log(x);
  }
}
