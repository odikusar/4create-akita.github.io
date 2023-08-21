import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, delay, first, map } from 'rxjs/operators';
import { UserService } from '../state/user/user.service';

const fakeBackendResponseTime = 1000;
const keyPressDebounceTime = 500;

export function userNameUniqueValidator(
  userService: UserService
): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors> =>
    userService.isNameUnique(control.value).pipe(
      debounceTime(keyPressDebounceTime),
      delay(fakeBackendResponseTime),
      map((isNameUnique: boolean) =>
        isNameUnique ? null : { userNameAlreadyExists: true }
      ),
      first()
    );
}
