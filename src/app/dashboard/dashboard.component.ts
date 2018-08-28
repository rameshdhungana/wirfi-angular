import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';
import {DashboardService} from '../_services/dashboard.service';
import * as d3 from 'd3';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  donut_chart: Array<any>;

  data = [
    [
      {
        'date': '1-May-12',
        'status': 1
      },
      {
        'date': '30-Apr-12',
        'status': 1
      },
      {
        'date': '27-Apr-12',
        'status': 1
      },
      {
        'date': '26-Apr-12',
        'status': 6
      },
      {
        'date': '25-Apr-12',
        'status': 6
      },
      {
        'date': '24-Apr-12',
        'status': 5
      },
      {
        'date': '23-Apr-12',
        'status': 5
      },
      {
        'date': '20-Apr-12',
        'status': 3
      },
      {
        'date': '19-Apr-12',
        'status': 3
      },
      {
        'date': '18-Apr-12',
        'status': 2
      },
      {
        'date': '17-Apr-12',
        'status': 6
      },
      {
        'date': '16-Apr-12',
        'status': 6
      },
      {
        'date': '13-Apr-12',
        'status': 4
      },
      {
        'date': '12-Apr-12',
        'status': 4
      },
      {
        'date': '11-Apr-12',
        'status': 2
      },
      {
        'date': '10-Apr-12',
        'status': 2
      },
      {
        'date': '9-Apr-12',
        'status': 1
      },
      {
        'date': '5-Apr-12',
        'status': 1
      },
      {
        'date': '4-Apr-12',
        'status': 1
      },
      {
        'date': '3-Apr-12',
        'status': 5
      },
      {
        'date': '2-Apr-12',
        'status': 5
      },
      {
        'date': '30-Mar-12',
        'status': 5
      },
      {
        'date': '29-Mar-12',
        'status': 6
      },
      {
        'date': '28-Mar-12',
        'status': 6
      },
      {
        'date': '27-Mar-12',
        'status': 6
      },
      {
        'date': '26-Mar-12',
        'status': 6
      }
    ],
    [
      {
        'date': '1-May-12',
        'status': 5
      },
      {
        'date': '30-Apr-12',
        'status': 5
      },
      {
        'date': '27-Apr-12',
        'status': 5
      },
      {
        'date': '26-Apr-12',
        'status': 1
      },
      {
        'date': '25-Apr-12',
        'status': 1
      },
      {
        'date': '24-Apr-12',
        'status': 5
      },
      {
        'date': '23-Apr-12',
        'status': 5
      },
      {
        'date': '20-Apr-12',
        'status': 6
      },
      {
        'date': '19-Apr-12',
        'status': 6
      },
      {
        'date': '18-Apr-12',
        'status': 6
      },
      {
        'date': '17-Apr-12',
        'status': 4
      },
      {
        'date': '16-Apr-12',
        'status': 4
      },
      {
        'date': '13-Apr-12',
        'status': 4
      },
      {
        'date': '12-Apr-12',
        'status': 2
      },
      {
        'date': '11-Apr-12',
        'status': 2
      },
      {
        'date': '10-Apr-12',
        'status': 2
      },
      {
        'date': '9-Apr-12',
        'status': 2
      },
      {
        'date': '5-Apr-12',
        'status': 1
      },
      {
        'date': '4-Apr-12',
        'status': 1
      },
      {
        'date': '3-Apr-12',
        'status': 1
      },
      {
        'date': '2-Apr-12',
        'status': 1
      },
      {
        'date': '30-Mar-12',
        'status': 1
      },
      {
        'date': '29-Mar-12',
        'status': 3
      },
      {
        'date': '28-Mar-12',
        'status': 3
      },
      {
        'date': '27-Mar-12',
        'status': 3
      },
      {
        'date': '26-Mar-12',
        'status': 3
      }
    ]
  ];

  private no_of_devices: number;

  constructor(
    private googleapiService: GoogleApiService,
    private dashboardservice: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardservice.getDashboard().subscribe(
      response => {
        this.donut_chart = response['data']['donut_chart'];
        this.no_of_devices = this.donut_chart.map(item => item.value).reduce((prev, next) => prev + next);
        const ctx = document.getElementById('doughnut_chart');
        this.createDoughnutChart(ctx);
      }
    );
  }

  ngAfterViewInit() {
    const that = this;

    // set the dimensions and margins of the graph
    const margin = { top: 20, right: 150, bottom: 30, left: 50 },
      width = 960 - margin.left - margin.right,
      height = 302 - margin.top - margin.bottom;

    const line_color = 'white';

    const status_colors = ['green', 'blue', 'yellow', 'orange', 'red', 'gray'];

    // array of curve functions and tites
    const daCurve = { 'd3Curve': d3.curveStepBefore, 'curveTitle': 'curveStepBefore' };

    // parse the date / time
    const parseTime = d3.timeParse('%d-%b-%y');

    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

    // define the line
    const valueline = d3.line()
      .curve(d3.curveCatmullRomOpen)
      .x(function (d) { return x(d['date']); })
      .y(function (d) { return y(d['status']); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#line_chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // const svgDefs = svg.append('defs');
    //
    // const mainGradient = svgDefs.append('linearGradient')
    //     .attr('id', 'mainGradient1');
    //
    // // Create the stops of the main gradient. Each stop will be assigned
    // // a class to style the stop using CSS.
    // mainGradient.append('stop')
    //     .attr('class', 'stop-left-1')
    //     .attr('offset', '0');
    //
    // mainGradient.append('stop')
    //     .attr('class', 'stop-right-1')
    //     .attr('offset', '1');

    for (const index in status_colors) {
      console.log(index);
      svg.append('rect')
          .attr('width', width)
          .attr('height', (height/6))
          .attr('transform', 'translate(0,' + (height/6 * index) + ')')
          .attr('fill', status_colors[index]);
    }

    for (const index in that.data) {
      if (this.data[index]) {
        // format the data
        that.data[index].forEach(function (d) {
          d['date'] = parseTime(d['date']).toDateString();
          d['status'] = d['status'] - 0.5;
        });

        // set the colour scale
        const color = d3.scaleOrdinal(d3.schemeCategory10);

        // Scale the range of the data
        x.domain(d3.extent<any, any>(that.data[index], function (d) { return new Date(d['date']); }));
        y.domain([0,6]);

        // Add the paths with different curves.
        svg.append('path')
          .datum(that.data[index])
          .attr('class', 'line')
          .style('stroke-width', '3')
          .style('fill', function(d) { return 'rgba(0, 0, 0, 0)'; })
          .style('stroke', function () { // Add the colour
            return daCurve['color'] = line_color;
          })
          // .attr('id', 'tag' + i) // assign ID
          .attr('d', d3.line<any>()
            .curve(daCurve.d3Curve)
            .x(function (d) { return x(new Date(d['date'])); })
            .y(function (d) { return y(d['status']); })
          );

        // Add the Legend
        // svg.append('text')
        //   .attr('x', width + 5)  // space legend
        //   .attr('y', margin.top + 20 + (i * 20))
        //   .attr('class', 'legend')    // style the legend
        //   .style('fill', function () { // Add the colours dynamically
        //     return daCurve['color'] = line_color;
        //   })
        //   .on('click', function () {
        //     // Determine if current line is visible
        //     const active = daCurve['active'] ? false : true,
        //     newOpacity = active ? 0 : 1;
        //     // Hide or show the elements based on the ID
        //     d3.select('#tag' + i)
        //     .transition().duration(100)
        //     .style('opacity', newOpacity);
        //     // Update whether or not the elements are active
        //     daCurve['active'] = active;
        //   })
        //   .text(daCurve.curveTitle);

        // Add the scatterplot
        // svg.selectAll('dot')
        //     .data(that.data[index])
        //     .enter().append('circle')
        //     .style('fill', function(d) { return '#ffffff'; })
        //     .attr('r', 2)
        //     .attr('cx', function (d) { console.log(new Date(d['date'])); return x(new Date(d['date'])); })
        //     .attr('cy', function (d) { return y(d['status']); });


        // Add the X Axis
        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(d3.axisBottom(x));

        // Add the Y Axis
        // svg.append('g')
        //   .attr('class', 'axis')
        //   // .ticks(1)
        //   .call(d3.axisLeft(y));
      }
    }
  }

  getlatlong(data: NgForm) {
    this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
    });
  }

  createDoughnutChart(node) {
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
                    .data(pie(this.donut_chart))
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
