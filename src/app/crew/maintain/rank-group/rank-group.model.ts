export class RankGroup{
   
    code: string;
    description: string;
    remarks: string;
      constructor(RankGroup) {
      
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    