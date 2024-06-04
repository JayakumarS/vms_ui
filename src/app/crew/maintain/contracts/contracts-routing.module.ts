import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "collective-contracts",
    loadChildren: () =>
      import("./collective-contract/collective-contract.module").then((m) => m.CollectiveContractModule),
  },

    {
      path: "contract-setup",
      loadChildren: () =>
        import("./contract-setup/contract-setup.module").then((m) => m.ContractSetupModule),
    },

    {
      path: "contract-kne",
      loadChildren: () =>
        import("./contracts-kne/contracts-kne.module").then((m) => m.ContractsKNEModule),
    },
    {
      path: "contract-nee",
      loadChildren: () =>
        import("./contracts-nee/contracts-nee.module").then((m) => m.ContractsNEEModule),
    }
  
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
