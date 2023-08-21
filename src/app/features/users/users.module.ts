import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ToggleButtonComponent } from 'src/app/components/toggle-button/toggle-button.component';
import { UserQuery } from '../../state/user/user.query';
import { UserService } from '../../state/user/user.service';
import { UserStore } from '../../state/user/user.store';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsersTableComponent } from './components/users-table/users-table.component';

@NgModule({
  declarations: [UsersComponent, UserModalComponent, UsersTableComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ToggleButtonComponent,
    ReactiveFormsModule,
  ],
  providers: [UserStore, UserQuery, UserService],
})
export class UsersModule {}
