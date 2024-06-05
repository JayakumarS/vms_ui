export class SeamansContract {
    seaman: string;
    vessel: string;
    rank:any;
    startingdate:any;
    typeofcontract:any;
    paytype:any;
    joiningdate:any;
    port:any;
    currency:any;
    dateofcontract:any;

   
    
    clientType:string;
    Success:boolean;
      constructor(commodity) {
      
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    