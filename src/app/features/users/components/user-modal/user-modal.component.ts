import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/state/user/user.service';
import { UserValidator } from 'src/app/validators/user.validator';

interface UserForm {
  name: FormControl<string>;
  active: FormControl<boolean>;
}

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter<void>();

  subscription: Subscription;
  addUserForm: FormGroup<UserForm> = this.fb.group<UserForm>({
    name: this.fb.control<string>(
      '',
      [Validators.required],
      [this.userValidator.nameUnique()]
    ),
    active: this.fb.control<boolean>(false),
  });

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private userValidator: UserValidator,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.checkViewAfterValidation();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  checkViewAfterValidation() {
    this.subscription = this.addUserForm.controls.name.statusChanges.subscribe(
      () => this.cdr.markForCheck()
    );
  }

  onCancel() {
    this.close.emit();
  }

  onSubmit() {
    if (this.addUserForm.valid) {
      this.userService.add(this.addUserForm.getRawValue());
      this.addUserForm.reset();
      this.close.emit();
    }
  }
}
