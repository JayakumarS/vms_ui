import { formatDate } from "@angular/common";
export class PortMaster {
  id: number;
  portCode: string;
  portName: string;
  portType: string;
  isActive: string;
  success:boolean;
  constructor(portMaster) {
    {
      this.id = portMaster.id || this.getRandomID();
      this.portCode = portMaster.portCode || "";
      this.portName = portMaster.portName || "";
      this.portType = portMaster.portType || "";
      this.isActive = portMaster.isActive || "";
      this.success = portMaster.Success || "";
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
