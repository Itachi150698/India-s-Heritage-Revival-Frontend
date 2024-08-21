import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';
import { HomeComponent } from './pages/home/home.component';
import { JewelleryComponent } from './pages/jewellery/jewellery.component';
import { AjantaComponent } from './pages/ajanta/ajanta.component';
import { ArtHeritageComponent } from './pages/art-heritage/art-heritage.component';
import { FortsComponent } from './pages/forts/forts.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { NorthEastComponent } from './pages/north-east/north-east.component';
import { SiteCulturalComponent } from './pages/site-cultural/site-cultural.component';
import { WalkthroughComponent } from './pages/walkthrough/walkthrough.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"jewllery", component:JewelleryComponent},
  { path: 'art-heritage', component: ArtHeritageComponent },
  { path: '', redirectTo: '/art-heritage', pathMatch: 'full' },
  { path: 'ajanta', component:AjantaComponent},
  { path: 'north-east', component:NorthEastComponent},
  { path: 'forts', component:FortsComponent},
  { path: 'walkthrough', component:WalkthroughComponent},
  {path: 'historic', component:HistoricComponent},
  {path: 'site-cultural', component:SiteCulturalComponent}
];

@NgModule({ 
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
