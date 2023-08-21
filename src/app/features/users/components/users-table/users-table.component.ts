import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { User } from 'src/app/state/user/user.model';

export interface UserToggleData {
  userId: number;
  active: boolean;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() users: User[] = [];
  @Output() toggleUserActive = new EventEmitter<UserToggleData>();

  trackByFn(index: number, user: User): number {
    return user.id;
  }

  onToggleUserActive(active: boolean, userId: number) {
    this.toggleUserActive.emit({ active, userId });
  }
}
