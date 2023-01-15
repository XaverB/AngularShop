import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor() { }

  averageRevenuePerMonth = [
    {
      month: 'january',
      revenue: 100
    },
    {
      month: 'february',
      revenue: 110
    },
    {
      month: 'march',
      revenue: 140
    },
    {
      month: 'april',
      revenue: 80
    },
    {
      month: 'may',
      revenue: 190
    },
    {
      month: 'june',
      revenue: 60
    },
    {
      month: 'july',
      revenue: 100
    },
    {
      month: 'august',
      revenue: 100
    },
    {
      month: 'september',
      revenue: 160
    },
    {
      month: 'october',
      revenue: 90
    },
    {
      month: 'november',
      revenue: 450
    },
    {
      month: 'december',
      revenue: 310
    },
  ];

  timeAndRevenueDistributedPerWeek = [
    {
      day: 'monday',
      cartAmount: 20,
      revenue: 2000
    },
    {
      day: 'tuesday',
      cartAmount: 25,
      revenue: 2750
    },
    {
      day: 'wednesday',
      cartAmount: 15,
      revenue: 1800
    },
    {
      day: 'thursday',
      cartAmount: 20,
      revenue: 2640
    },
    {
      day: 'friday',
      cartAmount: 30,
      revenue: 3600
    },
    {
      day: 'saturday',
      cartAmount: 35,
      revenue: 4200
    },
    {
      day: 'sunday',
      cartAmount: 10,
      revenue: 1200
    },
  ]

  getAverageRevenuePerMonth(): Observable<any[]> {
    return of(this.averageRevenuePerMonth);
  }

  getTimeAndRevenueDistributed(): Observable<any[]> {
  return of(this.timeAndRevenueDistributedPerWeek);
}
}
