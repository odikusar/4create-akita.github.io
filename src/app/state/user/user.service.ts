import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { User } from './user.model';
import { UserQuery } from './user.query';
import { UserStore } from './user.store';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private userStore: UserStore, private userQuery: UserQuery) {}

  private generateUniqueId(): number {
    const users = this.userQuery.getAll();
    const maxId =
      users.length > 0 ? Math.max(...users.map((user) => user.id)) : 0;
    return maxId + 1;
  }

  add(user: Omit<User, 'id'>) {
    const userWithId: User = { ...user, id: this.generateUniqueId() };
    this.userStore.add(userWithId);
  }

  setActive(userId: number, active: boolean) {
    this.userStore.update(userId, { active });
  }

  isNameUnique(name: string): Observable<boolean> {
    return this.userQuery
      .selectAll()
      .pipe(map((users) => !users.find((user) => user.name === name)));
  }
}
