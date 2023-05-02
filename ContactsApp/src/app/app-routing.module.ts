import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddComponent } from './add/add.component';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "add", component: AddComponent },
  { path: "login", component: LoginComponent },
  { path: "auth", component: AuthComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
