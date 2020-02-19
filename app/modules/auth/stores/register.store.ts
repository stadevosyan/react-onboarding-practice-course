import { injectable } from '@servicetitan/react-ioc';
import { observable } from 'mobx';

import { InputFieldState, DropdownFieldState } from '@servicetitan/form';
import { FormState } from 'formstate';
import { UserRole } from '../../common/enums/user-role';

@injectable()
export class RegisterStore {
    @observable
    formState = new FormState({
        login: new InputFieldState(''),
        password: new InputFieldState(''),
        passwordConfirm: new InputFieldState(''),
        role: new DropdownFieldState<UserRole>(UserRole.Public)
    });
}
