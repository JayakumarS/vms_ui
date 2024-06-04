export class MaintainRank {
  id: number;
  code: string;
  description: string;
  groupage: string;
  isActive: string;
  department:string;
  sno:number;
  remarks:any;
  ot:any;
  
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
  