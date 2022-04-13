import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guard/auth.guard';
import { NoauthGuard } from '../app/guard/noauth.guard';

const routes: Routes = [
  // { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule) }
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [NoauthGuard] },
  { path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule), canActivate: [NoauthGuard] },
  { path: 'tabs', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuard] },

  {
    path: 'camera',
    loadChildren: () => import('./camera/camera.module').then(m => m.CameraPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'media',
    loadChildren: () => import('./media/media.module').then(m => m.MediaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule),
    canActivate: [AuthGuard]
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
