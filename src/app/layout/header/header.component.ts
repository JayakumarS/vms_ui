import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/auth/auth.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AppService } from 'src/app/app.service';
import { HttpServiceService } from "src/app/auth/http-service.service";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { serverLocations } from "src/app/auth/serverLocations";
import { EncryptionService } from "src/app/core/service/encrypt.service";
import { ChangePasswordPopUpComponent } from "src/app/authentication/change-password-pop-up/change-password-pop-up.component";
import { NgxSpinnerService } from "ngx-spinner";
const document: any = window.document;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config: any = {};
  userImg: string;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  isOpenSidebar: boolean;
  userName:string; 
  companyImg:string;
  invoiceList:[];
  permissionList:any=[];
  salesCallList:[];
  salesCallCount: any;
  filePath:any;
  logoList: any;
  path: any;
  authForm: any;
  randomSecretKey:any;
  show:boolean=false;
  custshow:boolean=false;

  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public tokenStorageService:TokenStorageService,
    public languageService: LanguageService,
    private app:AppService,
    private token: TokenStorageService,
    public dialog: MatDialog,
    private serverUrl:serverLocations,
    private spinner:NgxSpinnerService,
    private httpService: HttpServiceService,
    private encryptionService:EncryptionService
  ) {
    super();
  }
  listLang = [
    { text: "English", flag: "assets/images/flags/us.jpg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.jpg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.jpg", lang: "de" },
  ];
  notifications: any[] = [
    {
      message: "Please check your mail",
      time: "14 mins ago",
      icon: "mail",
      color: "nfc-green",
      status: "msg-unread",
    },
    {
      message: "New Employee Added..",
      time: "22 mins ago",
      icon: "person_add",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Your leave is approved!! ",
      time: "3 hours ago",
      icon: "event_available",
      color: "nfc-orange",
      status: "msg-read",
    },
    {
      message: "Lets break for lunch...",
      time: "5 hours ago",
      icon: "lunch_dining",
      color: "nfc-blue",
      status: "msg-read",
    },
    {
      message: "Employee report generated",
      time: "14 mins ago",
      icon: "description",
      color: "nfc-green",
      status: "msg-read",
    },
    {
      message: "Please check your mail",
      time: "22 mins ago",
      icon: "mail",
      color: "nfc-red",
      status: "msg-read",
    },
    {
      message: "Salary credited...",
      time: "3 hours ago",
      icon: "paid",
      color: "nfc-purple",
      status: "msg-read",
    },
  ];
  ngOnInit() {

    this.proformaPermission();
    this.customerPermission();

    this.filePath = this.serverUrl.apiServerAddress;
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;

    this.logoList = null;
    this.path = null;
   

    this.userName = this.token.getUsername();
    if (userRole === "Admin") {
      this.homePage = "admin/dashboard/main";
    } else if (userRole === "Client") {
      this.homePage = "client/dashboard";
    } else if (userRole === "Employee") {
      this.homePage = "employee/dashboard";
    } else {
      this.homePage = "admin/dashboard/main";
    }


    this.langStoreValue = localStorage.getItem("lang");
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = "assets/images/flags/us.jpg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }

    //
  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  mailCall(){
    
  }

  salesCall(){
    
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    // this.subs.sink = this.authService.logout().subscribe((res) => {
    //   if (!res.success) {
    //     this.router.navigate(["/authentication/signin"]);
    //   }
    // });

   this.logOutUserLog();
   this.token.signOut();
    // this.toastr.info("Please Sign in to Continue", "Logout Successful")
    this.app.SetName('');
    
    localStorage.removeItem("currentUser");
    this.router.navigate(['/authentication/signin']);

  }

  logOutUserLog() {
    const obj = {
      userName: this.encryptionService.encryptAesToString("",this.randomSecretKey).toString()
    }
    
    this.authService.getLogOutUserLog(obj).subscribe((result: any) => {
      
    });
  }

  passwordChange(){
    const dialogRef = this.dialog.open(ChangePasswordPopUpComponent, {
      disableClose: true ,
      height: "550px",
      width: "465px",
  
    });
  }

  proformaPermission(){
    const permissionObj = {
      formCode: 'F6021',
      userId: this.tokenStorageService.getUserId()
    }
    //this.spinner.show();
    
  }

  customerPermission(){
    const permissionObj = {
      formCode: 'F1001',
      userId: this.tokenStorageService.getUserId()
    }
   
  }

 
}
