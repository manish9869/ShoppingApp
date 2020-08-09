import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  {
    path: "admin",
    loadChildren: "./Admin/admin.module#AdminModule",
    canActivate: [AuthGuard],
  },

  { path: "auth", loadChildren: "./auth/auth.module#AuthModule" },

  { path: "", loadChildren: "./Client/client.module#ClientModule" },
];

//, canActivate: [AuthGuard]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AngularRoutingModule { }
