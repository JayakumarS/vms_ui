import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CollectiveContract } from './collective-contract.model';
import { UnsubscribeOnDestroyAdapter } from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import { HttpClient } from '@angular/common/http';
import { serverLocations } from 'src/app/auth/serverLocations';
import { HttpServiceService } from 'src/app/auth/http-service.service';

@Injectable({
  providedIn: 'root'
})
export class CollectiveContractService extends UnsubscribeOnDestroyAdapter{  
  isTblLoading = true;
  dataChange: BehaviorSubject<CollectiveContract[]> = new BehaviorSubject<CollectiveContract[]>([]);
  
  constructor(
    private httpClient: HttpClient,
    private serverUrl:serverLocations,
    private httpService:HttpServiceService
  ) {
    super();
  }

  get data(): CollectiveContract[] {
    return this.dataChange.value;
  }

  getList(object){
    let list = [];
    let tempList = [];
    
    list = [
      {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"1",nationality:"Indian",gender:"Male",agent:"Sea",status:"Test"},
      {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"2",nationality:"Others",gender:"Female",agent:"Sea",status:"Test"},
      {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"2",nationality:"South",gender:"Female",agent:"Sea",status:"Test"},
      {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"1",nationality:"Indian",gender:"Male",agent:"Sea",status:"Test"}
    ];
    if(object.type == "search"){
      object.searchDtl.forEach((element,i) => {
        tempList = [];
        let value = element.criteria;
        let operator = element.operator;
        list.forEach((val,j)=>{
          switch (operator) {
            case '==':
                if (val.nationality == value) {
                    tempList.push(val);
                    list = tempList;
                }
                break;
            case '!=':
                if (val.nationality != value) {
                    tempList.push(val);
                    list = tempList;
                }
                break;
            default:
        }
        })
      });

      list = tempList;
    }else{
      list = [
        {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"1",nationality:"Indian",gender:"Male",agent:"Sea",status:"Test"},
        {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"2",nationality:"Others",gender:"Female",agent:"Sea",status:"Test"},
        {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"2",nationality:"South",gender:"Female",agent:"Sea",status:"Test"},
        {code:"YTS",surName:"Balaji",name:"Balaji",active:"yes",rank:"1",nationality:"Indian",gender:"Male",agent:"Sea",status:"Test"}
      ];
    }

    this.isTblLoading = false;
    this.dataChange.next(list);
    // this.subs.sink = this.httpService.post<any>(url,value).subscribe(
    //   (data) => {
    //     this.isTblLoading = false;
    //     this.dataChange.next(list);
    //   },
    //   (error: HttpErrorResponse) => {
    //     this.isTblLoading = false;
    //     console.log(error.name + " " + error.message);
    //   }
    // );
  }
}
