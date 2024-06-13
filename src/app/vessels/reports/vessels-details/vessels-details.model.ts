export class VesselsDetails {
    seaman: string;
    vessel: string;
    id: number;
    Success:boolean;
    vesseltype:any;
    fleet :any;
    vesselname:any;
    vesselcode:any;
    code:any;
    name:any;
    shortname:any;
    prefix:any;
    initials:any;
    sorting:any;
    xname1:any;
    type:any;
    xname2:any;
    pandi:any;
    vesseltype2:any;
    hullandmachinery:any;
    virtual:any;
    vesselgroup:any;
    fdandd:any;
    wagescale:any;
    classification:any;
    isActive:any;
    reason:any;
    vesselClass:any;
    fleetvessel:any;
    dateinfleettype:any;
    valiedUntil:any;
    leadvesselid:any;
    flag:any;
    greek:any;
    registryport:any;
    registryno:any;
    builtdate:any;
    placeBuild:any;
    yardbuild:any;
    imono:any;
    hullno:any;
    callsign:any;
    natnumber:any;
    mmis:any;
    classno:any;
    iceclass:any;
    shipowner:any;
    shipownerplatform:any;
    operator:any;
    useOperator:any;
    safteyno:any;
    officialManager:any;
    shipmanager:any;
    crewmanager:any;
    superintendent:any;
    groupmanager:any;
    dateinfleettypeObj:any;
    valiedUntilObj:any;
    
    clientType:string;
   
      constructor(commodity) {
      
      }
      public getRandomID(): string {
        const S4 = () => {
          return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return S4() + S4();
      }
    }
    