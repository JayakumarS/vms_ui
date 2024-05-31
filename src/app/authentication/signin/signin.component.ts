import { Component, OnInit } from "@angular/core";
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "src/app/auth/auth.service";
import { TokenStorageService } from 'src/app/auth/token-storage.service';
import { AuthLoginInfo } from 'src/app/auth/login-info';
import { Role } from "src/app/core/models/role";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
import { User } from "src/app/core/models/user";
import { BehaviorSubject,Observable } from 'rxjs';
//import { CompanyService } from "src/app/master/company/company.service";
import { HttpServiceService } from "src/app/auth/http-service.service";
//import { CompanyMasterResultBean } from "src/app/master/company/company.Resultbean";
import { HttpErrorResponse } from "@angular/common/http";
import { EncryptionService } from "src/app/core/service/encrypt.service";
declare var grecaptcha: any;

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  authForm: FormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  logoList : [];
  roles: string[] = [];
  userName : string ='';
   userObj = {};
   path:any;
   randomSecretKey:any;
   private currentUserSubject: BehaviorSubject<User>;
  private loginInfo: AuthLoginInfo;
  bgImg: any;
  bgList: any;
  login: boolean = false;
  siteKey: string = '6LeiApIfAAAAAOBsKqX0U-EQNu3lk3O9LVByiRAA';
  loginViaWebsiteFlag: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private app:AppService,
    private tokenStorage: TokenStorageService,
    //private companyService: CompanyService,
    private httpService: HttpServiceService,
    private encryptionService:EncryptionService
    
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
      recaptchaResponse: [""],
      emailId:[""],
    });
    this.authForm.value.recaptchaResponse

    // this.httpService.get<CompanyMasterResultBean>(this.authService.companyUrl).subscribe(
    //   (data:any) => {
    //     // console.log(data);
    //     this.logoList = data.companyLogo;
    //     this.path = this.logoList;
    //     this.bgList = data.backGroundImg;
    //     this.bgImg = this.bgList;
    //     // let pathLength = this.logoList.length;
    //   },
    //   (error: HttpErrorResponse) => {
    //     console.log(error.name + " " + error.message);
    //   }
    // );
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.authForm.get("username").setValue("admin@software.com");
    this.authForm.get("password").setValue("admin@123");
  }
  employeeSet() {
    this.authForm.get("username").setValue("employee@software.com");
    this.authForm.get("password").setValue("employee@123");
  }
  clientSet() {
    this.authForm.get("username").setValue("client@software.com");
    this.authForm.get("password").setValue("client@123");
  }
  onSubmit() {
    /*******************For Captcha ****************** */
    // if(this.authForm.value.recaptchaResponse ==null||this.authForm.value.recaptchaResponse ==""){
    //   this.loginViaWebsiteFlag=false
    // }else{
    //   this.loginViaWebsiteFlag=true
    // }
    /************************************************** */
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Username and Password not valid !";
      return;
    } 
    // else if(this.loginViaWebsiteFlag==false){
    //     var recaptchaRes = grecaptcha.getResponse();
    //     if (recaptchaRes.length == 0) {
    //       this.loading = false;
    //       this.error = "Please Click on Google Captcha Checkbox and then submit again";
    //       return;
    //   }
    // } 
    else {
      this.loginInfo = new AuthLoginInfo(
      this.f.username.value, this.f.password.value,this.f.emailId.value);
      this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {        

        if (data) {
              if(data.success){
                  setTimeout(() => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUsername(data.username);
                this.tokenStorage.saveAuthorities(data.roles);
                this.tokenStorage.saveUserId(data.email);
                this.loading = false;   
                this.loginSuccessUserLog();
                
                this.authService.getFormPropertyMenu(this.tokenStorage.getUserId()).subscribe(
                  data1 => {
                   this.tokenStorage.saveDashboardForm(JSON.stringify(data1.dashboardList));
                   //window.location.href ="/admin/dashboard/main";
                   this.router.navigate(["/admin/dashboard/main"]);
                  },
                    error => {   
                       
                    }
                );

                
              }, 1000);
              }else{
                 this.submitted = false;
                  this.loading = false;
                  this.error = "Invalid Login";
                console.log(data.message); 
              }

            } else {
              this.error = "Invalid Login";
            }
        
      },
        error => {
            this.submitted = false;
            this.loading = false;
            this.error = "Server Down!!!";
            console.log(error); 
            
        }
      );

      // this.subs.sink = this.authService
      //   .login(this.f.username.value, this.f.password.value)
      //   .subscribe(
      //     (res) => {
      //       if (res) {
      //         setTimeout(() => {
      //           const role = this.authService.currentUserValue.role;
      //           if (role === Role.All || role === Role.Admin) {
      //             this.router.navigate(["/admin/dashboard/main"]);
      //           } else if (role === Role.Employee) {
      //             this.router.navigate(["/employee/dashboard"]);
      //           } else if (role === Role.Client) {
      //             this.router.navigate(["/client/dashboard"]);
      //           } else {
      //             this.router.navigate(["/authentication/signin"]);
      //           }
      //           this.loading = false;
      //         }, 1000);
      //       } else {
      //         this.error = "Invalid Login";
      //       }
      //     },
      //     (error) => {
      //       this.error = error;
      //       this.submitted = false;
      //       this.loading = false;
      //     }
      //   );
    }
  }

  loginSuccessUserLog() {
    const obj = {
      userName: this.encryptionService.encryptAesToString(this.authForm.value.username, this.randomSecretKey).toString()
    }
    // console.log(obj);
    this.authService.getSuccessuserLog(obj).subscribe((result: any) => {
      
    });
  }
}
