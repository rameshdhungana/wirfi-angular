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
    chart = {}
    data = [
        [
          {
            "date": "1-May-12",
            "close": 558.13
          },
          {
            "date": "30-Apr-12",
            "close": 553.98
          },
          {
            "date": "27-Apr-12",
            "close": 567
          },
          {
            "date": "26-Apr-12",
            "close": 589.7
          },
          {
            "date": "25-Apr-12",
            "close": 599
          },
          {
            "date": "24-Apr-12",
            "close": 630.28
          },
          {
            "date": "23-Apr-12",
            "close": 666.7
          },
          {
            "date": "20-Apr-12",
            "close": 634.98
          },
          {
            "date": "19-Apr-12",
            "close": 645.44
          },
          {
            "date": "18-Apr-12",
            "close": 643.34
          },
          {
            "date": "17-Apr-12",
            "close": 543.7
          },
          {
            "date": "16-Apr-12",
            "close": 580.13
          },
          {
            "date": "13-Apr-12",
            "close": 605.23
          },
          {
            "date": "12-Apr-12",
            "close": 622.77
          },
          {
            "date": "11-Apr-12",
            "close": 626.2
          },
          {
            "date": "10-Apr-12",
            "close": 628.44
          },
          {
            "date": "9-Apr-12",
            "close": 636.23
          },
          {
            "date": "5-Apr-12",
            "close": 633.68
          },
          {
            "date": "4-Apr-12",
            "close": 624.31
          },
          {
            "date": "3-Apr-12",
            "close": 629.32
          },
          {
            "date": "2-Apr-12",
            "close": 618.63
          },
          {
            "date": "30-Mar-12",
            "close": 599.55
          },
          {
            "date": "29-Mar-12",
            "close": 609.86
          },
          {
            "date": "28-Mar-12",
            "close": 617.62
          },
          {
            "date": "27-Mar-12",
            "close": 614.48
          },
          {
            "date": "26-Mar-12",
            "close": 606.98
          }
        ],
        [
          {
            "date": "1-May-12",
            "close": 558.13
          },
          {
            "date": "30-Apr-12",
            "close": 553.98
          },
          {
            "date": "27-Apr-12",
            "close": 567
          },
          {
            "date": "26-Apr-12",
            "close": 589.7
          },
          {
            "date": "25-Apr-12",
            "close": 599
          },
          {
            "date": "24-Apr-12",
            "close": 630.28
          },
          {
            "date": "23-Apr-12",
            "close": 666.7
          },
          {
            "date": "20-Apr-12",
            "close": 634.98
          },
          {
            "date": "19-Apr-12",
            "close": 645.44
          },
          {
            "date": "18-Apr-12",
            "close": 643.34
          },
          {
            "date": "17-Apr-12",
            "close": 543.7
          },
          {
            "date": "16-Apr-12",
            "close": 580.13
          },
          {
            "date": "13-Apr-12",
            "close": 605.23
          },
          {
            "date": "12-Apr-12",
            "close": 622.77
          },
          {
            "date": "11-Apr-12",
            "close": 626.2
          },
          {
            "date": "10-Apr-12",
            "close": 628.44
          },
          {
            "date": "9-Apr-12",
            "close": 423
          },
          {
            "date": "5-Apr-12",
            "close": 123.68
          },
          {
            "date": "4-Apr-12",
            "close": 123.31
          },
          {
            "date": "3-Apr-12",
            "close": 23.32
          },
          {
            "date": "2-Apr-12",
            "close": 2363
          },
          {
            "date": "30-Mar-12",
            "close": 4155
          },
          {
            "date": "29-Mar-12",
            "close": 386
          },
          {
            "date": "28-Mar-12",
            "close": 23162
          },
          {
            "date": "27-Mar-12",
            "close": 1232
          },
          {
            "date": "26-Mar-12",
            "close": 343.98
          }
        ]
      ]

    constructor(
        private googleapiService: GoogleApiService
    ) {
    }

    ngOnInit() {
    }
    ngAfterViewInit() {

        var that = this;
    
    
        // set the dimensions and margins of the graph
        var margin = { top: 20, right: 150, bottom: 30, left: 50 },
          width = 960 - margin.left - margin.right,
          height = 470 - margin.top - margin.bottom;
    
        var colors = ["red", "blue"]
        // array of curve functions and tites
        var curveArray = [
    
          { "d3Curve": d3.curveStepBefore, "curveTitle": "curveStepBefore" }
        ];
    
    
    
        // parse the date / time
        var parseTime = d3.timeParse("%d-%b-%y");
    
        // set the ranges
        var x = d3.scaleTime().range([0, width]);
        var y = d3.scaleLinear().range([height, 0]);
    
        // define the line
        var valueline = d3.line()
          .curve(d3.curveCatmullRomOpen)
          .x(function (d) { return x(d['date']); })
          .y(function (d) { return y(d['close']); });
    
        // append the svg obgect to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#line_chart").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
          for (let dat in that.data) {
    
            // format the data
            that.data[dat].forEach(function (d) {
              d['date'] = parseTime(d['date']).toDateString();
              d['close'] = +d['close'];
            });
    
            // set the colour scale
            var color = d3.scaleOrdinal(d3.schemeCategory10);
    
            curveArray.forEach(function (daCurve, i) {
    
              // Scale the range of the data
              x.domain(d3.extent<any, any>(that.data[dat], function (d) { return new Date(d['date']); }));
              y.domain(d3.extent<any, any>(that.data[dat], function (d) { return d['close']; }));
    
              // Add the paths with different curves.
              svg.append("path")
                .datum(that.data[dat])
                .attr("class", "line")
                .style("fill", function(d) { return "rgba(255, 255, 255, 0)"; })
                .style("stroke", function () { // Add the colours dynamically
                  return daCurve['color'] = colors[dat];
                })
                .attr("id", 'tag' + i) // assign ID
                .attr("d", d3.line<any>()
                  .curve(daCurve.d3Curve)
                  .x(function (d) { return x(new Date(d['date'])); })
                  .y(function (d) { return y(d['close']); })
                );
    
              // Add the Legend
              svg.append("text")
                .attr("x", width + 5)  // space legend
                .attr("y", margin.top + 20 + (i * 20))
                .attr("class", "legend")    // style the legend
                .style("fill", function () { // Add the colours dynamically

                console.log(color(daCurve.curveTitle));
                  return daCurve['color'] = color(daCurve.curveTitle);
                })
                .on("click", function () {
                  // Determine if current line is visible 
                  var active = daCurve['active'] ? false : true,
                    newOpacity = active ? 0 : 1;
                  // Hide or show the elements based on the ID
                  d3.select("#tag" + i)
                    .transition().duration(100)
                    .style("opacity", newOpacity);
                  // Update whether or not the elements are active
                  daCurve['active'] = active;
                })
                .text(daCurve.curveTitle);
            });
    
            // Add the scatterplot
            svg.selectAll("dot")
              .data(that.data[dat])
              .enter().append("circle")
              .style("fill", function(d) { return "#ffffff"; })
              .attr("r", 2)
              .attr("cx", function (d) { console.log(new Date(d['date']));return x(new Date(d['date'])); })
              .attr("cy", function (d) { return y(d['close']); });
    
            if (dat == "1") {
    
              // Add the X Axis
              svg.append("g")
                .attr("class", "axis")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
    
              // Add the Y Axis
              svg.append("g")
                .attr("class", "axis")
                .call(d3.axisLeft(y));
            }
          }
    
        
    
      }
    getlatlong(data: NgForm){
        this.googleapiService.get_lat_long(data.value['address']).subscribe(response => {
            console.log(response);
        });
    }

    ngAfterContentInit() {
      
    }
}
