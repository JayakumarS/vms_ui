import { Injectable } from '@angular/core';
import { AuthService } from "src/app/auth/auth.service";
import { BehaviorSubject,Observable } from 'rxjs';
import { User } from "src/app/core/models/user";
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const AUTHORITIES_KEY = 'AuthAuthorities';
const AUTHUSERID_KEY = 'AuthUserId';
const DASHBOARDFORM_KEY = 'AuthDashboardForm';
const JVPGINDEX_KEY = 'JvPgIndex';
const ACPGINDEX_KEY = 'AcPgIndex';
const SGCPGINDEX_KEY = 'SgcPgIndex';
const BRPGINDEX_KEY = 'BrPgIndex';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor(private authService:AuthService) { }

  signOut() {
    window.sessionStorage.clear();
    this.authService.currentUserSubject = new BehaviorSubject<User>(new User());
    this.authService.currentUser = new BehaviorSubject<User>(new User());
    window.sessionStorage.removeItem(USERNAME_KEY);
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }

public saveUserId(userId: string) {
    window.sessionStorage.removeItem(AUTHUSERID_KEY);
    window.sessionStorage.setItem(AUTHUSERID_KEY, userId);
  }

  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
public getUserId(): string {
    return sessionStorage.getItem(AUTHUSERID_KEY);
  }
  public saveAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities));
  }

  public saveJournalVoucherPageIndex(userId: string) {
    window.sessionStorage.removeItem(JVPGINDEX_KEY);
    window.sessionStorage.setItem(JVPGINDEX_KEY, userId);
  }

  public getJournalVoucherPageIndex(): string {
    return sessionStorage.getItem(JVPGINDEX_KEY);
  }

  public saveAccountHeadPageIndex(userId: string) {
    window.sessionStorage.removeItem(ACPGINDEX_KEY);
    window.sessionStorage.setItem(ACPGINDEX_KEY, userId);
  }

  public getAccountHeadPageIndex(): string {
    return sessionStorage.getItem(ACPGINDEX_KEY);
  }

  public saveSubGroupCodePageIndex(userId: string) {
    window.sessionStorage.removeItem(SGCPGINDEX_KEY);
    window.sessionStorage.setItem(SGCPGINDEX_KEY, userId);
  }

  public getSubGroupCodePageIndex(): string {
    return sessionStorage.getItem(SGCPGINDEX_KEY);
  }

  public saveBankReceiptPageIndex(userId: string) {
    window.sessionStorage.removeItem(BRPGINDEX_KEY);
    window.sessionStorage.setItem(BRPGINDEX_KEY, userId);
  }

  public getBankReceiptPageIndex(): string {
    return sessionStorage.getItem(BRPGINDEX_KEY);
  }

  
  public getAuthorities(): string[] {
    this.roles = [];

    if (sessionStorage.getItem(TOKEN_KEY)) {
      JSON.parse(sessionStorage.getItem(AUTHORITIES_KEY)).forEach((authority: string) => {
        this.roles.push(authority);
      });
    }

    return this.roles;
  }


  public saveDashboardForm(token) {
    window.sessionStorage.removeItem(DASHBOARDFORM_KEY);
    window.sessionStorage.setItem(DASHBOARDFORM_KEY, token);
  }

  public getDashboardForm() {
    var array =[];
    if(sessionStorage.getItem(DASHBOARDFORM_KEY)!="null"){
      array = JSON.parse(sessionStorage.getItem(DASHBOARDFORM_KEY));
    }
    return array;
  }
}
