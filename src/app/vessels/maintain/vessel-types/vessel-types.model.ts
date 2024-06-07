export class VesselTypes{
   
    code: string;
    description: string;
    
      constructor(commodity) {
      
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    