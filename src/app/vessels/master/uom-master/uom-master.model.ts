import { formatDate } from "@angular/common";
export class UOMMaster {
  id: number;
  uomCode: string;
  uomName: string;
  success : boolean;

  constructor(uomMaster) {
    {
      this.id = uomMaster.id || this.getRandomID();
      this.uomCode = uomMaster.uomCode || "";
      this.uomName = uomMaster.uomName || "";
      this.success = uomMaster.Success || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
