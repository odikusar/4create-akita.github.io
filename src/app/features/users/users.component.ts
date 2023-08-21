import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map } from 'rxjs';
import { User } from 'src/app/state/user/user.model';
import { UserQuery } from 'src/app/state/user/user.query';
import { UserService } from 'src/app/state/user/user.service';
import { UserToggleData } from './components/users-table/users-table.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {
  readonly fullTableCount: number = 5;
  users$: Observable<User[]> = this.userQuery.selectAll();
  isUserModalOpen$ = new BehaviorSubject<boolean>(false);
  isAddUserDisabled$: Observable<boolean> = combineLatest([
    this.users$.pipe(map((users) => users.every((user) => user.active))),
    this.userQuery.selectCount(),
  ]).pipe(
    map(
      ([isAllUsersActive, userCount]) =>
        !isAllUsersActive || userCount >= this.fullTableCount
    )
  );

  constructor(private userQuery: UserQuery, private userService: UserService) {}

  toggleUserActive(data: UserToggleData) {
    this.userService.setActive(data.userId, data.active);
  }

  openUserModal() {
    this.isUserModalOpen$.next(true);
  }

  closeUserModal() {
    this.isUserModalOpen$.next(false);
  }
}
