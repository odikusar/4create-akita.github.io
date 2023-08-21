import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, delay, first, map } from 'rxjs/operators';
import { UserService } from '../state/user/user.service';

@Injectable({ providedIn: 'root' })
export class UserValidator {
  readonly fakeBackendResponseTime = 1000;

  constructor(private userService: UserService) {}

  nameUnique(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors> =>
      this.userService.isNameUnique(control.value).pipe(
        debounceTime(500),
        delay(this.fakeBackendResponseTime),
        map((isNameUnique: boolean) =>
          isNameUnique ? null : { userNameAlreadyExists: true }
        ),
        first()
      );
  }
}
