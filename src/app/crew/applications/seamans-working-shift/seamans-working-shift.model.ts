export class SeamansWorkingShift {
    seaman: string;
    vessel: string;
    months:any;
    rank:any;
    startingdate:any;
    remarks:any;
    endingDate:any;
    servicestate:any;
    watchkeeping:any;
    place:any;
    shiftend:any;
    shiftstart:any;
    startingDate:any;
    isChecked:any;
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
    