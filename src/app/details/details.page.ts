import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexDataLabels,
  ApexGrid
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
};
@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})

export class DetailsPage implements OnInit {
  colors = [];

  selectedSession: any;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;
  public chartOptions3: Partial<ChartOptions>;
  constructor(private route: ActivatedRoute, private router: Router, private _platform: Platform) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.selectedSession = this.router.getCurrentNavigation().extras.state.selectedSession;
      }
    });

    while (this.colors.length < 100) {
      do {
        var color = Math.floor((Math.random() * 1000000) + 1);
      } while (this.colors.indexOf(color) >= 0);
      this.colors.push("#" + ("ffffff"/* + color.toString(16)*/).slice(-6));
    }
    console.log(this.colors);
  }

  // public generateDayWiseTimeSeries(baseval, count, yrange) {
  //   var i = 0;
  //   var series = [];
  //   while (i < count) {
  //     var y =
  //       Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

  //     series.push([baseval, y]);
  //     baseval += 86400000;
  //     i++;
  //   }
  //   return series;
  // }

  async ngOnInit() {
    console.log(this.selectedSession);
    this.chartOptions = {
      series: [
        {
          name: "Pos X",
          data: this.selectedSession.heatMapPosX
        }
      ],
      chart: {
        height: 450,
        type: "line",
        zoom: {
          type: "xy"
        }
      },
      dataLabels: {
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: "numeric",
        title: {
          text: "Time in millisecond",
          style: {
            color: "#ffffff"
          }
        },
        // max: this.selectedSession.heatMapPosX.length,
        labels: {
          style: {
            colors: this.colors,
            fontSize: '10px',
          }
        },
        axisTicks: {
          color: '#fff',
        }
      },
      yaxis: {
        floating: false,
        decimalsInFloat: 2,
        max: 100,
        title: {
          text: "Angle",
          style: {
            color: "#ffffff"
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: ["#ffffff", "#ffffff"],
            fontSize: '10px',
          },

        },
      }
    };
    this.chartOptions1 = {
      series: [
        {
          name: "Neg x",
          data: this.selectedSession.heatMapNegX
        }
      ],
      chart: {
        height: 450,
        type: "line",
        zoom: {
          type: "xy"
        }
      },
      dataLabels: {
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: "numeric",
        title: {
          text: "Time in millisecond",
          style: {
            color: "#ffffff"
          }
        },
        // max: this.selectedSession.heatMapNegX.length,
        labels: {
          style: {
            colors: this.colors,
            fontSize: '10px',
          }
        },
        axisTicks: {
          color: '#fff',
        }
      },
      yaxis: {
        floating: false,
        decimalsInFloat: 2,
        max: 100,
        title: {
          text: "Angle",
          style: {
            color: "#ffffff"
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: ["#ffffff", "#ffffff"],
            fontSize: '10px',
          },

        },
      }
    };
    this.chartOptions2 = {
      series: [
        {
          name: "Neg x",
          data: this.selectedSession.heatMapPosY
        }
      ],
      chart: {
        height: 450,
        type: "line",
        zoom: {
          type: "xy"
        }
      },
      dataLabels: {
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: "numeric",
        title: {
          text: "Time in millisecond",
          style: {
            color: "#ffffff"
          }
        },
        // max: this.selectedSession.heatMapPosY.length,
        labels: {
          style: {
            colors: this.colors,
            fontSize: '10px',
          }
        },
        axisTicks: {
          color: '#fff',
        }
      },
      yaxis: {
        floating: false,
        decimalsInFloat: 2,
        max: 100,
        title: {
          text: "Angle",
          style: {
            color: "#ffffff"
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: ["#ffffff", "#ffffff"],
            fontSize: '10px',
          },

        },
      }
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Neg x",
          data: this.selectedSession.heatMapNegY
        }
      ],
      chart: {
        height: 450,
        type: "line",
        zoom: {
          type: "xy"
        }
      },
      dataLabels: {
      },
      grid: {
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        }
      },
      xaxis: {
        type: "numeric",
        title: {
          text: "Time in millisecond",
          style: {
            color: "#ffffff"
          }
        },
        // max: this.selectedSession.heatMapNegY.length,
        labels: {
          style: {
            colors: this.colors,
            fontSize: '10px',
          }
        },
        axisTicks: {
          color: '#fff',
        }
      },
      yaxis: {
        floating: false,
        decimalsInFloat: 2,
        max: 100,
        title: {
          text: "Angle",
          style: {
            color: "#ffffff"
          }
        },
        labels: {
          show: true,
          align: 'right',
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: ["#ffffff", "#ffffff"],
            fontSize: '10px',
          },

        },
      }
    };
  }

  ionViewWillEnter() {
    this.ngOnInit()
  }


}
