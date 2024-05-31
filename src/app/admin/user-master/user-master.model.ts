export class UserMaster {

    Success:boolean;
    fullName:any;
    emailId: any;
    contactNumber: any;
    designation:any;
    department:any;
    company:any;
    status: boolean;
    address: any;
    location: any;
    locationName: any;
    id: any;
    reportingmngr:any;
    userId : any;

    constructor(userMaster) {
        {
          this.id = userMaster.id || this.getRandomID();
          this.userId = userMaster.userId || "";
          this.Success = userMaster.Success || "";
        }
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }


}
