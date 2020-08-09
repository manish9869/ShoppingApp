import { AngularMaterialModule } from "./../angular-material.module";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ClientRoutingModule } from "./client-routing.module";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./components/home/home.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { NgxDropzoneModule } from "ngx-dropzone";

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    DragDropModule,
    NgxDropzoneModule,
  ],
})
export class ClientModule {}
