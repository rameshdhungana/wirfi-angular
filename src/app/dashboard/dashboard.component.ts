import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';
import * as d3 from 'd3';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    chart = [
        {'status': 'online', 'value': 5},
        {'status': 'cell', 'value': 4},
        {'status': 'auto-recover', 'value': 7},
        {'status': 'weak signal', 'value': 2},
        {'status': 'offline', 'value': 9},
        {'status': 'asleep', 'value': 1}
    ];

    private no_of_devices: number;

    constructor(
        private googleapiService: GoogleApiService,
    ) {
    }

    ngOnInit() {
    }

    getlatlong(data: NgForm) {
        this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
        });
    }

    ngAfterContentInit() {
      this.no_of_devices = this.chart.map(item => item.value).reduce((prev, next) => prev + next);
      const ctx = document.getElementById('doughnut_chart');
      this.createChart(ctx);
    }

    createChart(node) {
      const width = 200;
      const height = 200;
      const radius = Math.min(width, height) / 2;
      const color = d3.scaleOrdinal()
                    .range(['green', 'blue', 'yellow', 'orange', 'red', 'gray']);

      const arc = d3.arc<any>()
                  .outerRadius(radius - 10)
                  .innerRadius(radius - 15);

      const pie = d3.pie<any>()
                  .padAngle(.03)
                  .sort(null)
                  .value(function (d) {
                     return d.value;
                   });

      const canvas = d3.select(node)
                    .append('svg')
                    .attr('width', width)
                    .attr('height', height);

      const group = canvas.append('g')
                        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

      const arcs = group.selectAll<any, any>('.arc')
                      .data(pie(this.chart))
                      .enter()
                        .append('g')
                        .attr('class', 'arc');

      arcs.append('path')
          .attr('d', arc)
          .attr('fill', function(d: any): any {
            return color(d.data.status);
          });
      canvas.append('text')
          .attr('transform', function(d) { return 'translate(' + (width / 2 - 15) + ',' + height / 2 + ')'; })
          .attr('fill', 'white')
          .text(this.no_of_devices)
          .style('font-size', '35px')
          .style('font-weight', 'bold');

      canvas.append('text')
          .attr('transform', function(d) { return 'translate(' + (width / 2 - 38) + ',' + (height / 2 + 40) + ')'; })
          .attr('fill', 'gray')
          .text('DEVICES')
          .style('font-size', '18px');
    }
}
