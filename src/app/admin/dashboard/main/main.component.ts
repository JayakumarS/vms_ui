import { HttpErrorResponse } from "@angular/common/http";
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,
  ApexMarkers,
  ApexGrid,
  ApexTitleSubtitle,
  ApexResponsive,
  ApexAnnotations,
  ApexNonAxisChartSeries,
  ApexTheme,
  ApexStates,
} from "ng-apexcharts";
import { AuthService } from "src/app/auth/auth.service";
import { HttpServiceService } from "src/app/auth/http-service.service";
import { TokenStorageService } from "src/app/auth/token-storage.service";
import { MainDashboardResultBean } from "../dashboard-result-bean";
import { DashboardService } from "../dashboard.service";
import * as Chart from "chart.js";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  series1: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  responsive: ApexResponsive[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  updateOptions(options: any, redrawPaths?: boolean, animate?: boolean, updateSyncedCharts?: boolean): Promise<void>;

  colors: string[];
  labels: string[];
  markers: ApexMarkers;
  grid: ApexGrid;
  title: ApexTitleSubtitle;
  annotations: ApexAnnotations;
  toolbar: any;

};
export type ChartOptions1 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  colors: string[];
  labels: any;
  theme: ApexTheme;
  title: ApexTitleSubtitle;
};
export type collectionOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  fill: any;
  stroke: ApexStroke;
  states: ApexStates;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;
  dataLabels: ApexDataLabels;
};
@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  @ViewChild("chart", { static: false }) chart: ChartComponent;

  //@ViewChild("chart3", { static: false }) chart3: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  countvalue = [];
  docForm: FormGroup;
  docForm1: FormGroup;
  invlist = [];
  salelist = [];
  customerLimitList = [];
  itemWiseList = [];
  invoiceCount = [];
  earningsCount = [];
  salesOrderCount = [];
  ctryCustCount = [];
  itemName = [];

  // public updateOptionsData = {
  //   "1m": {
  //     xaxis: {
  //       min: undefined,
  //       max: undefined
  //     }
  //   },
  //   "6m": {
  //     xaxis: {
  //       min: new Date("27 Sep 2012").getTime(),
  //       max: new Date("27 Feb 2013").getTime()
  //     }
  //   },
  //   "1y": {
  //     xaxis: {
  //       min: new Date("27 Feb 2012").getTime(),
  //       max: new Date("27 Feb 2013").getTime()
  //     }
  //   },
  //   "1yd": {
  //     xaxis: {
  //       min: new Date("01 Jan 2013").getTime(),
  //       max: new Date("27 Feb 2013").getTime()
  //     }
  //   },
  //   all: {
  //     xaxis: {
  //       min: undefined,
  //       max: undefined
  //     }
  //   }
  // };

  itemlistdate = [];
  public cardChart1: any;
  public cardChart1Data: any;
  public cardChart1Label: any;

  public cardChart2: any;
  public cardChart2Data: any;
  public cardChart2Label: any;

  public cardChart3: any;
  public cardChart3Data: any;
  public cardChart3Label: any;

  public cardChart4: any;
  public cardChart4Data: any;
  public cardChart4Label: any;

  public areaChartOptions: Partial<ChartOptions>;
  public barChartOptions: Partial<ChartOptions>;
  public projectOptions: Partial<ChartOptions>;
  public performanceRateChartOptions: Partial<ChartOptions>;
  public salesOptions: Partial<ChartOptions>;
  public pieChartOptions1: Partial<ChartOptions1>;
  public collectionOptions: Partial<collectionOptions>;
  public activeOptionButton = "all";

  // Doughnut chart start
  public doughnutChartLabels: string[] = ["customer"];
  //  public doughnutChartData: number[] = this.ctryCustCount;
  public doughnutChartData = this.countvalue;
  public doughnutChartLegend = false;
  public doughnutChartColors: any[] = [
    {
      backgroundColor: ["#e86f66"],
    },
  ];
  public doughnutChartType = "doughnut";
  public doughnutChartOptions: any = {
    animation: false,
    responsive: true,
  };
  subs: any;
  mainDashboardService: DashboardService;

  incomeList = [];
  ExpensesList = [];
  getBomList = [];
  getBORList = [];
  getBOOList = [];
  customerSurvey = [];
  agingAlrt1 = [];
  agingAlrt2 = [];
  agingAlrt3 = [];
  agingAlrt4 = [];
  agingAlrt5 = [];
  config: {
    id: string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  config1: {
    id: string,
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  }
  config2: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  config3: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  config4: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  }
  config5: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  config6: {
    itemsPerPage: number,
    currentPage: number,
    totalItems: number
  };
  salesQuoteDetails = [];
  purchaseInvoiceDetails = [];
  dashboardForm = [];
  userLogDetails = [];

  bomCountValue: any;
  booCountValue: any;
  borCountValue: any;
  usersCountValue: any;
  value: String;
  // For Paginations
  public page = 1;
  public pageSize = 5;
  public page1 = 1;
  public pageSize1 = 10;
  public page2 = 1;
  public pageSize2 = 10;
  public page3 = 1;
  public pageSize3 = 10;
  public page4 = 1;
  public pageSize4 = 10;
  public page5 = 1;
  public pageSize5 = 10;
  public page6 = 1;
  public pageSize6 = 10;
  public page7 = 1;
  public pageSize7 = 10;
  public page8 = 1;
  public pageSize8 = 10;
  public page9 = 1;
  public pageSize9 = 10;
  purchaseOrderCount = [];
  Qty = [];
  customerlistcount = [];
  originalArray = [];
  wolistArray = [];
  qtyArray = [];
  WocountArray = [];
  itemlist = [];
  salesAverageCountlist = [];
  pieChartOptions: { series: number[]; chart: { type: string; width: number; }; legend: { show: boolean; }; dataLabels: { enabled: boolean; }; labels: string[]; responsive: { breakpoint: number; options: {}; }[]; };

  siva: number;
  salesAveragelist = [];
  Collectionslist = [];
  itemListnotSaleslist = [];
  itemnamelist = [];
  salesdate = [];
  convertedDate: any;
  unixTimestamps: number[];
  monlist = [];
  collection = [];
  countArray = [];
  WorkOrderCount = [];
  WorkOrderDate = [];
  WorkOrderArry1 = [];
  booArry2 = [];
  borArry3 = [];
  bomArry4 = [];
  Arry5 = [];
  boolistArray = [];
  boocountArray = [];
  borlistArray = [];
  borcountArray = [];
  bomlistArray = [];
  bomcountArray = [];
  //transformedData: number[] | { x: any; y: any; fillColor?: string; strokeColor?: string; meta?: any; goals?: any; }[] | [number, number][] | [number, number[]][];


  constructor(private fb: FormBuilder, private authService: AuthService, public router: Router,
    private dashboardService: DashboardService,
    public route: ActivatedRoute, private renderer: Renderer2, private el: ElementRef,
    private httpService: HttpServiceService,
    public token: TokenStorageService

  ) {

  }
  isTblLoading = true;
  ngOnInit() {
    this.dateStringToUnixTimestamp('');

    this.chart5();
    this.dashboardForm = this.token.getDashboardForm();
    console.log(this.dashboardForm);

    this.docForm = this.fb.group({
      object: [""],
      objectId: [""],
      userName: [""],
      setUp: [""],
      ipAddress: [""],
      actions: [""],
      fromDate: [""],
      toDate: [""],
    });
    this.docForm1 = this.fb.group({
      salesOrderNo: [""],
      customer: [""],
      currency: [""],
      deliveryDate: [""],
      actions: [""],
    });


    this.smallChart1();
    this.smallChart2();
    this.smallChart3();
    this.smallChart4();
    this.chart1();
    this.chart2();
    this.chart4();
    //this.projectChart();






    ////Ageing List Service
    this.httpService.get<any>(this.dashboardService.getCustAnlsForDashBd).subscribe(
      (data) => {
        this.agingAlrt1 = data.agingAlrt1;
        this.agingAlrt2 = data.agingAlrt2;
        this.agingAlrt3 = data.agingAlrt3;
        this.agingAlrt4 = data.agingAlrt4;
        this.agingAlrt5 = data.agingAlrt5;
        this.config2 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.agingAlrt1.length

        };
        this.config3 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.agingAlrt2.length

        };
        this.config4 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.agingAlrt3.length

        };
        this.config5 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.agingAlrt4.length

        };
        this.config6 = {
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.agingAlrt5.length

        };

      });






    ////chart Average sales  List
    this.httpService.get<any>(this.dashboardService.getAveragesaleslist).subscribe(
      (res) => {
        // this.salesOptions.series = res.getBOOList
        this.salesAveragelist = res.getBOOList
        if (this.salesAveragelist.length > 0) {
          this.initChart1();
        }

      });




    ////chart Average Collections  List
    this.httpService.get<any>(this.dashboardService.getAverageCollectionslist).subscribe(
      (res1) => {
        //  this.salesOptions.series = res1.getBOOList
        this.Collectionslist = res1.getBOOList
        if (this.Collectionslist.length > 0) {
          this.initChart();
        }



      });
    //get item not sales list Order Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getitemNotSaleslist).subscribe(
      (data1) => {
        this.itemListnotSaleslist = data1.getBORList;
        this.chart6()
        if (this.Qty.length > 0) {
          this.chart6();
        }
      });

    ////////////////customer Survey List
    this.httpService.get<any>(this.dashboardService.getCustomerSurveyList).subscribe(
      (data) => {
        //this.areaChartOptions.series = (data.getCustomerCountList);
        this.chart1();
      });

    ////Income List
    this.httpService.get<any>(this.dashboardService.getIncomelist).subscribe(
      (data) => {
        this.incomeList.push(data.totalIncomeList);

      });

    ////Expenses List
    this.httpService.get<any>(this.dashboardService.getExpensesList).subscribe(
      (data) => {
        this.ExpensesList.push(data.totalExpensesList);

      });

    //Invioce Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.invoiceCount).subscribe(
      (data) => {
        this.invoiceCount.push(data.invoiceCount);
      });

    //Invioce Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.earningsCount).subscribe(
      (data) => {
        this.earningsCount.push(data.earningsCount);
      });

    //item wise sales report
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getItemWiseList).subscribe(
      (data) => {
        this.itemWiseList = data.salesOrderDetails;
        this.chart1();
      });

  
    ///////////////pending sales Quote List////////////
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getAllSalesQuote).subscribe(
      (data) => {
        this.salesQuoteDetails = data.salesQuoteDetails;
      });

    ////////////////pending customer Invoice List//////////////////
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getPendingInvoiceList).subscribe(
      (data) => {
        this.purchaseInvoiceDetails = data.purchaseInvoiceDetails;
      });

    //User Log List
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getUserLogListUrl).subscribe(
      (data) => {
        this.userLogDetails = data.userLogDetails;
      });

    //BOM,BOO,BOR counts
    this.httpService.get<any>(this.dashboardService.getDashboardCountsUrl).subscribe(
      (data) => {
        this.bomCountValue = data.bomCount;
        this.booCountValue = data.booCount;
        this.borCountValue = data.borCount;
        this.usersCountValue = data.usersCount;
        //this.projectChart();
      });
    ////chart workorder Dynamic List
    this.httpService.get<any>(this.dashboardService.getWorkOrderList).subscribe(
      (data) => {
        this.WorkOrderCount = data.getWorkOrderGraph
        this.projectChart();
      });
    //Sales Order Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.salesOrderCount).subscribe(
      (data) => {
        this.salesOrderCount.push(data.salesOrderCount);
      });

    //get QtyOrderCount Order Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getQtyOrderCount).subscribe(
      (data) => {
        this.Qty = data.getBORList;
        if (this.Qty.length > 0) {
          this.chart5();
        }
      });




    //get customer list Order Count
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getcustomerlistCount).subscribe(
      (res) => {
        this.customerlistcount = res.getBOOList;
        if (this.customerlistcount.length > 0) {
          this.chart6();
        }
      });

    //purchase Order Count 
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.purchaseOrderCount).subscribe(
      (data) => {
        this.purchaseOrderCount.push(data.purchaseOrderCount);
      });

    // customer Count 

    this.httpService.get<MainDashboardResultBean>(this.dashboardService.countvalue).subscribe(
      (doughnutChartData) => {
        this.countvalue.push(doughnutChartData.countvalue);
      });

    this.httpService.get<MainDashboardResultBean>(this.dashboardService.ctryCustCount).subscribe(
      (doughnutChartData) => {
        this.ctryCustCount = doughnutChartData.ctryCustCount;
      });
    this.getsalesOrder();

    this.getInvList();



  }
  getsalesOrder() {
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getsalesOrder).subscribe(
      (data) => {
        this.salelist = data.salesOrderDetails;
        this.config = {
          id: 'pagination',
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.salelist.length
        };
      }
    );
  }
  getInvList() {
    this.httpService.get<MainDashboardResultBean>(this.dashboardService.getListUrl).subscribe(
      (data) => {

        this.invlist = data.lCustomerInvoiceBean;
        this.config1 = {
          id: 'pagination1',
          itemsPerPage: 5,
          currentPage: 1,
          totalItems: this.invlist.length
        };
      }
    );
  }

  Addcall(data) {
    window.sessionStorage.setItem("findFrom", "Opened");
    this.router.navigate(['/marketing/salesOrder/addOrder/' + data.countValue]);
  }
  CustomerInvcall(data) {
    window.sessionStorage.setItem("findFrom", "Opened");
    this.router.navigate(['/finance/invoice/customerInvoice/addCustomerInvoiceComponent/' + data.purchaseInvoiceNo]);
  }







  private smallChart1() {
    this.cardChart1 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart1Data = [
      {
        label: "New Clients",
        data: [50, 61, 80, 50, 72, 52, 60, 41, 30, 45, 70, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(103,119,239,.7)",
        pointBackgroundColor: "rgba(103,119,239,.2)",
        backgroundColor: "rgba(103,119,239,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart1Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }


  private smallChart2() {
    this.cardChart2 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart2Data = [
      {
        label: "New Customers",
        data: [50, 61, 80, 50, 40, 93, 63, 50, 62, 72, 52, 60, 41, 30, 45, 70],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(253,126,20,.7)",
        pointBackgroundColor: "rgba(253,126,20,.2)",
        backgroundColor: "rgba(253,126,20,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart2Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }


  private smallChart3() {
    this.cardChart3 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart3Data = [
      {
        label: "New Customers",
        data: [52, 60, 41, 30, 45, 70, 50, 61, 80, 50, 72, 40, 93, 63, 50, 62],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(40,167,69,.7)",
        pointBackgroundColor: "rgba(40,167,69,.2)",
        backgroundColor: "rgba(40,167,69,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart3Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private smallChart4() {
    this.cardChart4 = {
      responsive: true,
      tooltips: {
        enabled: false,
      },
      legend: {
        display: false,
      },
      scales: {
        yAxes: [
          {
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: true,
              display: false,
            },
          },
        ],
        xAxes: [
          {
            gridLines: {
              drawBorder: false,
              display: false,
            },
            ticks: {
              display: false,
            },
          },
        ],
      },
      title: {
        display: false,
      },
    };
    this.cardChart4Data = [
      {
        label: "New Customers",
        data: [30, 45, 70, 40, 93, 63, 50, 62, 50, 61, 80, 50, 72, 52, 60, 41],
        borderWidth: 4,
        pointStyle: "circle",
        pointRadius: 4,
        borderColor: "rgba(0,123,255,.7)",
        pointBackgroundColor: "rgba(0,123,255,.2)",
        backgroundColor: "rgba(0,123,255,.2)",
        pointBorderColor: "transparent",
      },
    ];
    this.cardChart4Label = [
      "16-07-2018",
      "17-07-2018",
      "18-07-2018",
      "19-07-2018",
      "20-07-2018",
      "21-07-2018",
      "22-07-2018",
      "23-07-2018",
      "24-07-2018",
      "25-07-2018",
      "26-07-2018",
      "27-07-2018",
      "28-07-2018",
      "29-07-2018",
      "30-07-2018",
      "31-07-2018",
    ];
  }
  private chart1() {
    this.areaChartOptions = {
      series: [
        {
          name: "New Customer",
          data: [31, 40, 28, 51, 42, 85, 77],
        },
        {
          name: "Old Customer",
          data: [11, 32, 45, 32, 34, 52, 41],
        },
      ],
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        foreColor: "#9aa0ac",
      },
      colors: ["#FC8380", "#6973C6"],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2022-01-14",
          "2022-02-15",
          "2022-03-16",
          "2022-04-17",
          "2022-05-18",
          "2022-06-19",
          "2022-07-20",
          "2022-08-21",
          "2022-09-22",
          "2022-10-23",
          "2022-11-24",
          "2022-12-25",
        ],
      },
      legend: {
        show: true,
        position: "top",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
      },

      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: "New Errors",
          data: [44, 55, 41, 67, 22, 43],
        },
        {
          name: "Bugs",
          data: [13, 23, 20, 8, 13, 27],
        },
        {
          name: "Development",
          data: [11, 17, 15, 15, 21, 14],
        },
        {
          name: "Payment",
          data: [21, 7, 25, 13, 22, 8],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        foreColor: "#9aa0ac",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "30%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        type: "category",
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      },
      legend: {
        show: false,
      },
      fill: {
        opacity: 0.8,
        colors: ["#01B8AA", "#374649", "#FD625E", "#F2C80F"],
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }

  private projectChart() {

    ///Bom
    //  for (let i = 0; i < this.WorkOrderCount[0]?.data?.length; i++) {

    this.Arry5.push(this.WorkOrderCount[0].data);

    this.bomArry4 = this.WorkOrderCount[0].data;
    //}
    //BOO
    // for (let i = 0; i < this.WorkOrderCount[1]?.data?.length; i++) {

    this.Arry5.push(this.WorkOrderCount[1].data);

    this.booArry2 = this.WorkOrderCount[1].data;
    // }
    //Bor
    // for (let i = 0; i < this.WorkOrderCount[2]?.data?.length; i++) {

    this.Arry5.push(this.WorkOrderCount[2].data);

    this.borArry3 = this.WorkOrderCount[2].data;
    //  }
    //WO
    //  for (let i = 0; i < this.WorkOrderCount[3]?.data?.length; i++) {

    this.Arry5.push(this.WorkOrderCount[3].data);

    this.WorkOrderArry1 = this.WorkOrderCount[3].data;
    //    }

    // bom
    this.bomArry4.forEach(data => {
      if (data.createdDate) {
        this.bomlistArray.push(data.createdDate);
      }
      this.bomcountArray.push(data.salesOrderCount);


    });

    // this.bomArry4.forEach(data => {
    //   if (data.createdDate) {
    //     this.bomlistArray.push(data.createdDate);
    //   }
    //   if (data.salesOrderCount) {
    //     this.bomcountArray.push(data.salesOrderCount);
    //   }
    // });
    const originalArray: string[] = this.bomlistArray;
    const qtyArray: string[] = this.bomcountArray;
    const numberArray: number[] = qtyArray.map(item => parseInt(item, 10));


    // boo

    this.booArry2.forEach(data => {
      if (data.createdDate) {
        this.boolistArray.push(data.createdDate);
      }

      this.boocountArray.push(data.salesOrderCount);
    });
    const originalArray1: string[] = this.boolistArray;
    const qtyArray1: string[] = this.boocountArray;
    const numberArray1: number[] = qtyArray1.map(item => parseInt(item, 10));


    // bor
    this.borArry3.forEach(data => {
      if (data.createdDate) {
        this.borlistArray.push(data.createdDate);
      }

      this.borcountArray.push(data.salesOrderCount);

    });
    const originalArray2: string[] = this.borlistArray;
    const qtyArray2: string[] = this.borcountArray;
    const numberArray2: number[] = qtyArray2.map(item => parseInt(item, 10));



    // WOrkOrder
    this.WorkOrderArry1.forEach(data => {
      if (data.createdDate) {
        this.wolistArray.push(data.createdDate);
      }

      this.WocountArray.push(data.salesOrderCount);

    });
    const originalArray3: string[] = this.wolistArray;
    const qtyArray3: string[] = this.WocountArray;
    const numberArray3: number[] = qtyArray3.map(item => parseInt(item, 10));

    // this.projectOptions = {
    //   series: [
    //     {
    //       name: "BOM",
    //       type: "column",
    //       data: numberArray
    //     },
    //     {
    //       name: "BOO",
    //       type: "area",
    //       data: numberArray1
    //     },
    //     {
    //       name: "BOR",
    //       type: "line",
    //       data: numberArray2
    //     },
    //     {
    //       name: "WO",
    //       type: "bar",
    //       data: numberArray3
    //     }
    //   ],
    //   chart: {
    //     height: 350,
    //     type: "line",
    //     stacked: false
    //   },
    //   stroke: {
    //     width: [0, 2, 5],
    //     curve: "smooth"
    //   },
    //   plotOptions: {
    //     bar: {
    //       columnWidth: "50%"
    //     }
    //   },

    //   fill: {
    //     opacity: [0.85, 0.25, 1],
    //     gradient: {
    //       inverseColors: false,
    //       shade: "light",
    //       type: "vertical",
    //       opacityFrom: 0.85,
    //       opacityTo: 0.55,
    //       stops: [0, 100, 100, 100]
    //     }
    //   },
    //   labels: [
    //     "01/01/2023",
    //     "02/01/2023",
    //     "03/01/2023",
    //     "04/01/2023",
    //     "05/01/2023",
    //     "06/01/2023",
    //     "07/01/2023",
    //     "08/01/2023",
    //     "09/01/2023",
    //     "10/01/2023",
    //     "11/01/2023",
    //     "12/01/2023",
    //   ],
    //   markers: {
    //     size: 0
    //   },
    //   xaxis: {
    //     type: "datetime"
    //   },
    //   yaxis: {
    //     title: {
    //       text: ""
    //     },
    //     min: 0
    //   },
    //   tooltip: {
    //     shared: true,
    //     intersect: false,
    //     y: {
    //       formatter: function (y) {
    //         if (typeof y !== "undefined") {
    //           return y.toFixed(0) + " ";
    //         }
    //         return y;
    //       }
    //     }
    //   }
    // };

    var currentDate = new Date();
    var currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed, so add 1
    var currentYear = currentDate.getFullYear();
    var currentLabel = currentMonth.toString().padStart(2, '0') + '/' + currentYear;


    var currentDate = new Date();
    var currentMonth = currentDate.getMonth(); // Get the current month (0-indexed)
    var currentYear = currentDate.getFullYear();

    // Calculate the previous month and year
    var previousMonth = currentMonth === 0 ? 11 : currentMonth - 1; // Handle January (0) by wrapping to December (11)
    var previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Get the number of days in the previous month
    var numDaysInPreviousMonth = new Date(previousYear, previousMonth + 1, 0).getDate();

    // Create an array of date labels for the current month
    var labels = [];

    for (var day = 1; day <= numDaysInPreviousMonth; day++) {
      var dayString = day.toString().padStart(2, '0');
      var label = currentMonth.toString().padStart(2, '0') + '/' + dayString + '/' + currentYear;
      labels.push(label);
    }

    this.projectOptions = {


      series: [{
        name: 'Active',
        type: 'column',
        data: numberArray
      }, {
        name: 'Closed',
        type: 'area',
        data: numberArray1
      }, {
        name: 'Completed',
        type: 'line',
        data: numberArray2
      },
      {
        name: 'Progress',
        type: 'line',
        data: numberArray3
      }],
      chart: {
        height: 350,
        type: 'line',
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: labels,
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      yaxis: {
        title: {
          text: 'Points',
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;

          }
        }
      }
    };

    // var chart = new ApexCharts(document.querySelector("#chart"), options);
    // chart.render();

  }

  private chart5() {
    this.Qty.forEach(item => {
      if (item.itemName) {
        this.originalArray.push(item.itemName);
      }
      if (item.Qty) {
        this.qtyArray.push(item.Qty);
      }
    });
    const originalArray: string[] = this.originalArray;
    const qtyArray: string[] = this.qtyArray;
    const numberArray: number[] = qtyArray.map(item => parseInt(item, 10));

    this.pieChartOptions = {
      series: numberArray,
      chart: {
        type: "donut",
        width: 300,
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      labels: originalArray,
      responsive: [
        {
          breakpoint: 480,
          options: {},
        },
      ],
    };
  }

  private chart6() {


    this.itemListnotSaleslist.forEach(item => {
      if (item.itemName) {
        this.itemnamelist.push(item.itemName);
      }
      if (item.itemcount) {
        this.itemlist.push(item.itemcount);
      }
      // if (item.createdDate) {
      //   this.itemlistdate.push(item.createdDate);
      // }
    });

    const itemnamelist: string[] = this.itemnamelist;
    const itemlistdate: string[] = this.itemlistdate;
    const itemlist: string[] = this.itemlist;
    const numberArray: number[] = itemlist.map(item => parseInt(item, 10));
    const dateArray: Date[] = itemlistdate.map(dateStr => new Date(dateStr));


    this.chartOptions = {
      series: [
        {
          name: "Days",
          data: numberArray
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: itemnamelist

      }
    };
  }

  private chart4() {
    this.performanceRateChartOptions = {
      series: [
        {
          name: "Bill Amount",
          data: [113, 120, 130, 120, 125, 119, 126],
        },
      ],
      chart: {
        height: 380,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        foreColor: "#9aa0ac",
        toolbar: {
          show: false,
        },
      },
      colors: ["#545454"],
      dataLabels: {
        enabled: true,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 1,
      },
      xaxis: {
        categories: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        title: {
          text: "Weekday",
        },
      },
      yaxis: {
        title: {
          text: "Bill Amount($)",
        },
      },
      tooltip: {
        theme: "dark",
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }




  dateStringToUnixTimestamp(dateStr: string): number {
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are 0-indexed in JavaScript
    const year = parseInt(parts[2], 10);

    const date = new Date(Date.UTC(year, month, day, 0, 0, 0, 0)); // Use Date.UTC to ensure consistency
    return date.getTime(); // Convert milliseconds to seconds for Unix timestamp
  }



  private initChart1() {
    this.salesAveragelist.forEach(data => {
      if (data.createdDate) {
        this.salesdate.push(data.createdDate);
        this.monlist.push(data.workDate);
      }
    });
    // const transformedData: { x: number; y: number }[] = this.salesAveragelist
    // .filter(data => data.createdDate && data.salesOrderCount)
    // .map(data => ({
    //   x: this.dateStringToUnixTimestamp(data.createdDate),
    //   y: data.salesOrderCount,
    // }));
    // const transformedData: number[] = this.salesAveragelist
    //   .filter(data => data.createdDate && data.salesOrderCount)
    //   .map(data => data.salesOrderCount);

    // const labels: string[] = this.salesAveragelist
    //   .filter(data => data.createdDate && data.salesOrderCount)
    //   .map(data => this.dateStringToUnixTimestamp(data.createdDate).toString());
    this.salesAveragelist.forEach(item => {
      if (item.itemName) {
        this.originalArray.push(item.itemName);
      }
      if (item.salesOrderCount) {
        this.qtyArray.push(item.salesOrderCount);
      }
    });
    const originalArray: string[] = this.originalArray;
    const qtyArray: string[] = this.qtyArray;
    const numberArray: number[] = qtyArray.map(item => parseInt(item, 10));

    this.pieChartOptions1 = {
      series: numberArray,
      chart: {
        width: "220%",
        type: "pie"
      },
      labels: originalArray,
      theme: {
        monochrome: {
          enabled: true
        }
      },

      title: {
        text: "Last Month Sales"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };

    // this.salesOptions = {
    //   series: [
    //     {
    //       name: "Sales",
    //       data: transformedData,
    //     },
    //     // Add other series if needed
    //   ],
    //   chart: {
    //     type: "area",
    //     height: 300,
    //   },
    //   annotations: {
    //     yaxis: [
    //       {
    //         y: 30,
    //         borderColor: "#999",
    //         label: {
    //           text: "Support",
    //           style: {
    //             color: "#fff",
    //             background: "#ed8332",
    //           },
    //         },
    //       },
    //     ],
    //     xaxis: [
    //       {
    //         x: new Date().getTime(),
    //         borderColor: "#999",
    //         label: {
    //           text: "Rally",
    //           style: {
    //             color: "#fff",
    //             background: "#ed8332"
    //           }
    //         }
    //       }
    //     ],
    //   },

    //   dataLabels: {
    //     enabled: false,
    //   },
    //   markers: {
    //     size: 0,
    //   },
    //   xaxis: {
    //     type: "datetime",
    //   },

    //   tooltip: {
    //     x: {
    //       format: "dd MMM yyyy"
    //     }

    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shadeIntensity: 1,
    //       inverseColors: false,
    //       opacityFrom: 0.45,
    //       opacityTo: 0.05,
    //       stops: [20, 100, 100, 100]
    //     }
    //   },

    // };
  }
  private initChart() {

    this.Collectionslist.forEach(item1 => {
      if (item1.itemName) {
        this.collection.push(item1.itemName);
      }
      if (item1.salesOrderCount) {
        this.countArray.push(item1.salesOrderCount);
      }
    });
    const originalArray: string[] = this.collection;
    const qtyArray: string[] = this.countArray;
    const numberArray: number[] = qtyArray.map(item => parseInt(item, 10));

    // this.Collectionslist.forEach(data => {
    //   if (data.createdDate) {
    //     this.salesdate.push(data.createdDate);
    //     this.monlist.push(data.workDate);
    //   }
    // });
    // const transformedData: { x: any; y: any }[] = this.Collectionslist
    //   .filter(data => data.createdDate && data.salesOrderCount)
    //   .map(data => ({
    //     x: this.dateStringToUnixTimestamp(data.createdDate),
    //     y: data.salesOrderCount,
    //   }));

    this.collectionOptions = {
      series: numberArray,
      chart: {
        width: "95%",
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2
        }
      },
      stroke: {
        width: 0
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true
              }
            }
          }
        }
      },
      labels: originalArray,
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8
        }
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          enabled: true,
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines"
          ]
        }
      },
      states: {
        hover: {
          filter: {
            type: "none"
          }
        }
      },
      theme: {
        palette: "palette2"
      },
      title: {
        text: "Last Month Collections"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
    // this.collectionOptions = {
    //   series: [
    //     {
    //       name: "Collections",
    //       data: transformedData,
    //     },
    //     // Add other series if needed
    //   ],
    //   chart: {
    //     type: "area",
    //     height: 300,
    //   },
    //   colors: ['#ffa21f', '#00ff00', '#f9c275'], // Customize colors here
    //   annotations: {
    //     yaxis: [
    //       {
    //         y: 30,
    //         borderColor: "#ed8332",
    //         label: {
    //           text: "Support",
    //           style: {
    //             color: "#fff",
    //             background: "#ed8332",
    //           },
    //         },
    //       },
    //     ],
    //     xaxis: [
    //       {
    //         x: new Date().getTime(),
    //         borderColor: "#ed8332",
    //         label: {
    //           text: "Rally",
    //           style: {
    //             color: "#fff",
    //             background: "#ed8332",
    //           },
    //         },
    //       },
    //     ],
    //   },
    //   dataLabels: {
    //     enabled: false,
    //   },
    //   markers: {
    //     size: 0,
    //   },
    //   xaxis: {
    //     type: "datetime",
    //     // categories: this.salesdate,
    //     tickAmount: 6,
    //   },
    //   tooltip: {
    //     x: {
    //       format: "dd MMM yyyy",
    //     },
    //   },
    //   fill: {
    //     type: "gradient",
    //     gradient: {
    //       shadeIntensity: 1,
    //       opacityFrom: 0.7,
    //       opacityTo: 0.9,
    //       stops: [0, 100],
    //     },
    //   },
    // };

  }




  pageChanged1(event) {
    this.config1.currentPage = event;
  }
  pageChanged(event) {
    this.config.currentPage = event;
  }

  /*******************For Customer Analysis Report Pagination ******************/
  pageChanged2(event) {
    this.config2.currentPage = event;
  }
  pageChanged3(event) {
    this.config3.currentPage = event;
  }
  pageChanged4(event) {
    this.config4.currentPage = event;
  }
  pageChanged5(event) {
    this.config5.currentPage = event;
  }
  pageChanged6(event) {
    this.config6.currentPage = event;
  }
  /************************************************** */




}
