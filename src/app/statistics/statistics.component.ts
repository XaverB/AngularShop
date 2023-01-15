import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../shared/statistics.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  averageRevenuePerMonth: any[] = [];
  timeAndRevenueDistributedPerWeek: any[] = [];

  averageRevenuePerMonthChartOptions: EChartsOption = {};

  timeAndRevenueDistributedChartOptions: EChartsOption = {};

  constructor(private statisticsService: StatisticsService) { }

  // https://echarts.apache.org/handbook/en/how-to/label/rich-text
  ngOnInit(): void {
    this.statisticsService.getAverageRevenuePerMonth().subscribe(s => {

      const month: string[] = [];
      s.forEach(item => {
        month.push(item.month)
      })
      const revenue: number[] = [];
      s.forEach(item => {
        revenue.push(item.revenue)
      })

      this.averageRevenuePerMonthChartOptions = {
        xAxis: {
          type: 'category',
          // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          data: month
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            // data: [820, 932, 901, 934, 1290, 1330, 1320],
            data: revenue,
            type: 'line',
            label: {
              show: true,
              formatter: '{c}',
              fontSize: 16,
            },
          },
        ],
      }
    });



    this.statisticsService.getTimeAndRevenueDistributed().subscribe(s => {

      const day: string[] = [];
      s.forEach(item => {
        day.push(item.day)
      })
      const revenue: number[] = [];
      const cartAmount = new Map();
      s.forEach(item => {
        revenue.push(item.revenue)
        cartAmount.set(item.revenue, item.cartAmount);
      })


      this.timeAndRevenueDistributedChartOptions = {
        xAxis: {
          data: day
        },
        yAxis: {},
        series: [
          {
            type: 'scatter',
            data: revenue,
            symbolSize: function (value) {
              const v = cartAmount.get(value);
              return v;
            },
            label: {
              show: true,
              formatter: function (val: any) {
                const v = cartAmount.get(val.data);
                return `${v} Carts`;
            },
              fontSize: 16,

            },
          }
        ]
      };
    }
    );
  }

}
