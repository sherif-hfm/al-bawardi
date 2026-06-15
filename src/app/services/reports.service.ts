import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(public http: HttpClient,public settings: SettingsService) {
    
  }

  getMonthlyReport(year: any, calendar: 'gregorian' | 'hijri' = 'gregorian'){
    console.log('getMonthlyReport');
    const params = new HttpParams().set('calendar', calendar);
    return this.http.get( this.settings.ApiBaseUrl +  '/reports/monthlyReport/' + year  ,{params: params, observe:'body',responseType:'json'});
  }
}
