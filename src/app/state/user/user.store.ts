import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { User } from './user.model';

const initialUsers: User[] = [
  { id: 1, name: '111', active: true },
  { id: 2, name: '222', active: true },
];

export interface UserState extends EntityState<User> {}
@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'users' })
export class UserStore extends EntityStore<UserState, User> {
  constructor() {
    super();
    this.setInitialUsers();
  }

  private setInitialUsers() {
    this.set(initialUsers);
  }
}
