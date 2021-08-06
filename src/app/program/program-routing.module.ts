import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { ProgramListComponent } from './program-list/program-list.component';




const routes: Routes = [
    {
        path: 'programs',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: ProgramListComponent
            },
            {
                path: ':id',
                component: DetailsComponent
            }
        ]
    }
]
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProgramRoutingModule { }
