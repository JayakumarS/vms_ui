export class fleetmanager{
   
    fleet:any;
    opmanager:any;
    techmanager:any;
    code:any;
    
      constructor(commodity) {
      
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    