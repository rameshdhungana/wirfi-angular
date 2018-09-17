import {Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoogleApiService } from '../_services/google-api.service';
import {DashboardService} from '../_services/dashboard.service';
import * as d3 from 'd3';
import * as cloneDeep from 'lodash/cloneDeep';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  donut_chart: Array<any>;

doughnut_filter_data = [
  {
    'status': 'ONLINE',
    'value': 0
  },
  {
    'status': 'CELL',
    'value': 0
  },
  {
    'status': 'AUTO RECOVER',
    'value': 0
  },
  {
    'status': 'WEAK SIGNAL',
    'value': 0
  },
  {
    'status': 'OFFLINE',
    'value': 0
  },
  {
    'status': 'ASLEEP',
    'value': 0
  }
];
doughnut_filter_data_toggle = [
  {
    'status': 'ONLINE',
    'value': 0
  },
  {
    'status': 'CELL',
    'value': 0
  },
  {
    'status': 'AUTO RECOVER',
    'value': 0
  },
  {
    'status': 'WEAK SIGNAL',
    'value': 0
  },
  {
    'status': 'OFFLINE',
    'value': 0
  },
  {
    'status': 'ASLEEP',
    'value': 0
  }
];
industry_types_line_graph = [];
industry_types_doughnut_graph = [];
filter_data = {};

value_of_checkbox = [];

data_new =  {
//   'type1': [{
//     'device_name': 'device1',
//     'address': 'address',
//     'data':  [
//           {
//             'date': '01:00:00',
//             'status': 1
//           },
//           {
//             'date': '02:00:00',
//             'status': 2
//           },
//           {
//             'date': '03:00:00',
//             'status': 3
//           },
//           {
//             'date': '04:00:00',
//             'status': 4
//           },
//           {
//             'date': '05:00:00',
//             'status': 5
//           },
//           {
//             'date': '06:00:00',
//             'status': 6
//           },
//           {
//             'date': '07:00:00',
//             'status': 4
//           },
//           {
//             'date': '08:00:00',
//             'status': 4
//           },
//           {
//             'date': '09:00:00',
//             'status': 4
//           }
//         ]
//  },
//   {
//     'device_name': 'device2',
//     'address': 'address',
//     'data':  [
//           {
//             'date': '01:00:00',
//             'status': 1
//           },
//           {
//             'date': '02:00:00',
//             'status': 1
//           },
//           {
//             'date': '03:00:00',
//             'status': 3
//           },
//           {
//             'date': '04:00:00',
//             'status': 3
//           },
//           {
//             'date': '05:00:00',
//             'status': 2
//           },
//           {
//             'date': '06:00:00',
//             'status': 4
//           },
//           {
//             'date': '07:00:00',
//             'status': 6
//           },
//           {
//             'date': '08:00:00',
//             'status': 4
//           },
//           {
//             'date': '09:00:00',
//             'status': 4
//           }
//         ]
//  }],
 'type2': [
//    {
//     'device_name': 'device3',
//     'address': 'address',
//     'data':  [
//           {
//             'date': '01:00:00',
//             'status': 1
//           },
//           {
//             'date': '02:00:00',
//             'status': 2
//           },
//           {
//             'date': '03:00:00',
//             'status': 3
//           },
//           {
//             'date': '04:00:00',
//             'status': 5
//           },
//           {
//             'date': '05:00:00',
//             'status': 3
//           },
//           {
//             'date': '06:00:00',
//             'status': 6
//           },
//           {
//             'date': '07:00:00',
//             'status': 2
//           },
//           {
//             'date': '08:00:00',
//             'status': 4
//           },
//           {
//             'date': '09:00:00',
//             'status': 4
//           }
//         ]
//  },
  {
    'device_name': 'device4',
    'address': 'address',
    'data':  [
          {
            'date': '01:00:00',
            'status': 5
          },
          {
            'date': '01:15:00',
            'status': 5
          },
          {
            'date': '01:30:00',
            'status': 5
          },
          {
            'date': '01:45:00',
            'status': 5
          },
          {
            'date': '02:00:00',
            'status': 1
          },
          {
            'date': '02:15:00',
            'status': 1
          },
          {
            'date': '02:30:00',
            'status': 1
          },
          {
            'date': '02:45:00',
            'status': 1
          },
          {
            'date': '03:00:00',
            'status': 4
          },
          {
            'date': '04:00:00',
            'status': 2
          },
          {
            'date': '05:00:00',
            'status': 1
          },
          {
            'date': '06:00:00',
            'status': 3
          },
          {
            'date': '07:00:00',
            'status': 2
          },
          {
            'date': '08:00:00',
            'status': 4
          },
          {
            'date': '09:00:00',
            'status': 4
          }
        ]
 }]
};


  filtered_data: object;
  filtered_data_toggle: object;
  private no_of_devices = 0;

  constructor(
    private googleapiService: GoogleApiService,
    private dashboardservice: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardservice.getDashboard().subscribe(
      response => {
        console.log(response);
        this.donut_chart = response['data']['donut_chart'];
        const ctx = document.getElementById('doughnut_chart');
        console.log( response['data']['industry_type']);
        for (const key in response['data']['industry_type']) {
          if (response['data']['industry_type'][key]) {
            this.industry_types_doughnut_graph.push( response['data']['industry_type'][key]);
          }
        }
        this.sumDonutChart( this.donut_chart);
        this.createDoughnutChart(ctx, this.doughnut_filter_data);
      }
    );
  }

  ngAfterViewInit() {
    for (const industry_type in this.data_new) {
      if (this.data_new[industry_type]) {
        this.industry_types_line_graph.push(industry_type);
      }
    }
    const cloneobj = cloneDeep(this.data_new);
    this.createLineGraph(cloneobj);
  }


  noOfDevice(data) {
    this.no_of_devices = 0;
      for (const key_device in data) {
        if (data[key_device]) {
          this.no_of_devices = this.no_of_devices + data[key_device].value;
        }
      }
  }

  sumDonutChart(data) {
    this.filtered_data = {};
    for (const key in data) {
      if (data[key]) {
        for (const key_device in data[key]) {
          if (data[key][key_device]) {
            this.doughnut_filter_data[key_device].value = this.doughnut_filter_data[key_device].value + data[key][key_device].value;
          }
        }
      }
    }
    this.noOfDevice(this.doughnut_filter_data);
  }

  createLineGraph(data) {
    d3.select('#line_chart svg').remove();
    const margin = { top: 20, right: 150, bottom: 30, left: 50 };
    const width = 960 - margin.left - margin.right;
    const height = 302 - margin.top - margin.bottom;
    const status_colors = ['green', 'blue', 'yellow', 'orange', 'red', 'gray'];
    this.filtered_data = data;
    // set the ranges
    const x = d3.scaleTime().range([0, width]);
    const y = d3.scaleLinear().range([height, 0]);

 // Define the div for the tooltip
    const div = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

    // parse the date / time
     const parseTime = d3.timeParse('%H:%M:%S');
    // const parseTime = function(data_date) {
      // return new Date(data_date);
      // console.log(new Date(data_date));
      // };
    // array of curve functions and tites
    const daCurve = { 'd3Curve': d3.curveStepAfter, 'curveTitle': 'curveStepAfter' };
    const line_color = 'white';
    // define the line
    const valueline = d3.line()
      .curve(d3.curveCatmullRomOpen)
      .x(function (d) { return x( (d['date'])) ; })
      .y(function (d) { return y(d['status']); });

    // append the svg obgect to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    const svg = d3.select('#line_chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    svg.append('text')
    .attr('x', (width + 40))
    .attr('y', (margin.top + 80 ))
    .style('fill', 'white')
    .style('font-size', '16px')
    .text('3 Online');

    svg.append('text')
    .attr('x', (width + 40))
    .attr('y', (margin.top + 100 ))
    .style('fill', 'white')
    .style('font-size', '16px')
    .style('z-index', '1300')
    .text('3 Cell');

    svg.append('text')
    .attr('x', (width + 40))
    .attr('y', (margin.top + 120 ))
    .style('fill', 'white')
    .style('font-size', '16px')
    .style('z-index', '1300')
    .text('3 Auto Recover');

    svg.append('text')
    .attr('x', (width + 40))
    .attr('y', (margin.top + 140 ))
    .style('fill', 'white')
    .style('font-size', '16px')
    .style('z-index', '1300')
    .text('3 Weak Signal');

    svg.append('text')
    .attr('x', (width + 40))
    .attr('y', (margin.top + 160 ))
    .style('fill', 'white')
    .style('font-size', '16px')
    .style('z-index', '1300')
    .text('3 Offline');

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
      if (status_colors[index]) {
        svg.append('rect')
            .attr('width', width)
            .attr('height', (height / 6))
            .attr('transform', 'translate(0,' + (height / 6 * Number(index)) + ')')
            .attr('fill', status_colors[index]);
      }
    }

    for (const index_industry in this.filtered_data) {
      if (this.filtered_data[index_industry]) {
        const device_data = this.filtered_data[index_industry];
        for (const index in device_data) {
          if (device_data[index]) {
            console.log(device_data[index].device_name);
            const device_status_data = device_data[index].data;
            if (device_status_data) {
              // format the data
              device_status_data.forEach(function (d) {
                // d['date'] = parseTime(d['date']).toDateString();
                d['date'] = (parseTime(d['date']));
                d['status_1'] = d['status'] - 0.5;
              });

              // set the colour scale
              const color = d3.scaleOrdinal(d3.schemeCategory10);
              // Scale the range of the data
              x.domain(d3.extent<any, any>(device_status_data, function (d) { console.log(d['date']); return ( d['date']); }));
              y.domain([0, 6]);

              // svg.selectAll('dot')
              //       .datum(device_status_data)
              //       .enter().append('circle')
              //       .attr('r', 5)
              //       .attr('cx', function(d) { return x((d['date'])); })
              //       .attr('cy', function(d) {  return y(d['status_1']); })
              //       .on('mouseover', function(d) {
              //           div.transition()
              //               .duration(200)
              //               .style('opacity', .9);
              //           div	.html(d.date + '<br/>'  + d.status_1)
              //               .style('left', (d3.event.pageX) + 'px')
              //               .style('top', (d3.event.pageY - 28) + 'px');
              //           })
              //       .on('mouseout', function(d) {
              //           div.transition()
              //               .duration(500)
              //               .style('opacity', 0);
              //       });

              // Add the paths with different curves.
              console.log(device_status_data);

              svg.append('path')
                .datum(device_status_data)
                .attr('class', 'line')
                .style('stroke-width', '4')
                .style('fill', function(d) { return 'rgba(0, 0, 0, 0)'; })
                .on('mouseover', function(d) {
                  div.transition()
                      .duration(200)
                      .style('opacity', .9);
                  div	.html(device_data[index].device_name)
                      .style('left', (d3.event.pageX) + 'px')
                      .style('top', (d3.event.pageY - 28) + 'px');
                  })
                .on('mouseout', function(d) {
                  div.transition()
                      .duration(500)
                      .style('opacity', 0);
                })
                .style('stroke', function () { // Add the colour
                  return daCurve['color'] = line_color;
                })
                .attr('d', d3.line<any>()
                  .curve(d3.curveStepAfter)
                  .x(function (d) {
                    // add circle in path
                    // svg.append('circle')
                    // .attr('cx', x((d['date'])))
                    // .attr('cy', y(d['status_1']))
                    // .attr('r', 10)
                    // .on('mouseover', function(d) {
                    //   console.log('mouse over');
                    //     div.transition()
                    //         .duration(200)
                    //         .style('opacity', .9);
                    //     div	.html('hello')
                    //         .style('left', (d3.event.pageX) + 'px')
                    //         .style('top', (d3.event.pageY - 28) + 'px');
                    //     })
                    // .on('mouseout', function(d) {
                    //     div.transition()
                    //         .duration(500)
                    //         .style('opacity', 0);
                    // });
                    console.log(x(d['date']));
                    return x((d['date'])); })
                  .y(function (d) { return y(d['status_1']); })
                );
            //     .on('mouseover', function(d) {
            //       console.log(d['date']);
            //       div.transition()
            //           .duration(200)
            //           .style('opacity', .9);
            //       div
            //       .html( parseTime(d.date) + '<br/>'  + d.status)
            //           .style('left', (d3.event.pageX) + 'px')
            //           .style('top', (d3.event.pageY - 28) + 'px');
            //       })
            //   .on('mouseout', function(d) {
            //       div.transition()
            //           .duration(500)
            //           .style('opacity', 0);
            //   }
            // );

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
                .attr('transform', 'translate(0,' + height + ')')
                .call(d3.axisBottom(x)
                .tickSize(-(height))
                .tickFormat(d3.timeFormat('%H:%M')));
              // Add the Y Axis
              // svg.append('g')
              //   .attr('class', 'axis')
              //   // .ticks(1)
              //   .call(d3.axisLeft(y));
              d3.selectAll('g.tick')
              // only ticks that returned true for the filter will be included
              // in the rest of the method calls:
                .select('line') // grab the tick line
                .attr('class', 'quadrantBorder') // style with a custom class and CSS
                .style('stroke-width', 0.5) // or style directly with attributes or inline styles
                .style('stroke', '#232938');
            }
          }

        }
      }

    }
  }

  toggleFeatureDoughnut(item, datavalue) {
    const ctx = document.getElementById('doughnut_chart');
    if (datavalue === true) {
      // console.log(this.data_donut['donut_chart'][item]);
      console.log(this.donut_chart);
      for (const key in this.donut_chart[item]) {
        if (this.donut_chart[item][key]) {
          // console.log('old_',this.donut_chart[item][key].value);
          this.doughnut_filter_data_toggle[key].value = this.doughnut_filter_data_toggle[key].value + this.donut_chart[item][key].value;
        }
      }

    } else {
      for (const key in this.donut_chart[item]) {
        if (this.donut_chart[item][key]) {
          // console.log("old_",this.donut_chart[item][key].value);
          this.doughnut_filter_data_toggle[key].value = this.doughnut_filter_data_toggle[key].value - this.donut_chart[item][key].value;
        }
      }
    }

    this.noOfDevice(this.doughnut_filter_data_toggle);
    this.createDoughnutChart(ctx, this.doughnut_filter_data_toggle);
  }

  toggleFeature(item, datavalue) {
    if (datavalue === true) {
      this.filter_data[item] = cloneDeep(this.data_new[item]);
    } else {
      delete this.filter_data[item];
    }
    if (Object.keys(this.filter_data).length === 0 ) {
      const cloneObj = cloneDeep(this.data_new);
      this.createLineGraph(cloneObj);
    } else {
      this.createLineGraph(this.filter_data);
    }
  }

  // for map
  getlatlong(data: NgForm) {
    this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
    });
  }

  // doughnut chart
  createDoughnutChart(node, data) {
    d3.select('#doughnut_chart svg').remove();
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
                    .data(pie(data))
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

  // function Step(context, t) {
  //   this._context = context;
  //   this._t = t;
  // }
  //
  // Step.prototype = {
  //     areaStart: function() {
  //         this._line = 0;
  //     },
  //     areaEnd: function() {
  //         this._line = NaN;
  //     },
  //     lineStart: function() {
  //         this._x = this._y = NaN;
  //         this._point = 0;
  //     },
  //     lineEnd: function() {
  //         if (0 < this._t && this._t < 1 && this._point === 2) {
  //         this._context.lineTo(this._x, this._y);
  //         }
  //
  //         if (this._line || (this._line !== 0 && this._point === 1)) {
  //         this._context.closePath();
  //         }
  //         if (this._line >= 0) {
  //         this._t = 1 - this._t, this._line = 1 - this._line;
  //         }
  //     },
  //
  //     point: function(x, y) {
  //         x = +x, y = +y;
  //         switch (this._point) {
  //         case 0:
  //             this._point = 1;
  //             this._line ? this._context.lineTo(x, y) : this._context.moveTo(x, y);
  //             break;
  //         case 1:
  //             this._point = 2; // proceed
  //             break;
  //         default:
  //             {
  //                 let xN, yN, mYb, mYa;
  //                 if (this._t <= 0) {
  //                     xN = Math.abs(x - this._x) * 0.25;
  //                     yN = Math.abs(y - this._y) * 0.25;
  //                     mYb = (this._y < y) ? this._y + yN : this._y - yN;
  //                     mYa = (this._y > y) ? y + yN : y - yN;
  //
  //                     this._context.quadraticCurveTo(this._x, this._y, this._x, mYb);
  //                     this._context.lineTo(this._x, mYa);
  //                     this._context.quadraticCurveTo(this._x, y, this._x + xN, y);
  //                     this._context.lineTo(x - xN, y);
  //
  //                 } else {
  //                     const x1 = this._x * (1 - this._t) + x * this._t;
  //
  //                     xN = Math.abs(x - x1) * 0.25;
  //                     yN = Math.abs(y - this._y) * 0.25;
  //                     mYb = (this._y < y) ? this._y + yN : this._y - yN;
  //                     mYa = (this._y > y) ? y + yN : y - yN;
  //
  //                     this._context.quadraticCurveTo(x1, this._y, x1, mYb);
  //                     this._context.lineTo(x1, mYa);
  //                     this._context.quadraticCurveTo(x1, y, x1 + xN, y);
  //                     this._context.lineTo(x - xN, y);
  //                 }
  //                 break;
  //             }
  //         }
  //         this._x = x, this._y = y;
  //     }
  // };
  //
  // const stepRoundAfter = function(context) {
  //     return new Step(context, 1);
  // };
}
