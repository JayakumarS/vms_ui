export class SeamansShiftingSkills {
    seaman: string;
    vessel: string;
    months:any;
    rank:any;
    nationality:any;
    servicestate:any;
    
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
    