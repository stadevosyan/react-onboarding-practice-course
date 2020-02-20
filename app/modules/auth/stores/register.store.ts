import { injectable } from '@servicetitan/react-ioc';
import { observable, action } from 'mobx';

import { InputFieldState, DropdownFieldState, FormValidators } from '@servicetitan/form';
import { FormState } from 'formstate';
import { UserRole } from '../../common/enums/user-role';

@injectable()
export class RegisterStore {
    login = new InputFieldState('').validators(
        FormValidators.required,
        val => val.length <= 3 && 'should be at least 3 characters'
    );
    password = new InputFieldState('').validators(
        val =>
            !FormValidators.passwordIsValidFormat(val) &&
            '* password must be at least 8 characters long including a number, a lowercase letter, and an uppercase letter'
    );
    passwordConfirm = new InputFieldState('').validators(
        val => this.password.value !== val && 'Passwords must match'
    );
    role = new DropdownFieldState<UserRole>(UserRole.Public);

    @observable
    formState = new FormState({
        login: this.login,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        role: this.role
    });

    @action
    register = async () => {
        const validation = await this.formState.validate();
        if (validation.hasError) {
            return;
        }
    };

    onPasswordChange = (
        e: React.SyntheticEvent<HTMLInputElement, Event>,
        data: { value: string }
    ) => {
        const pswrdConfirmField = this.formState.$.passwordConfirm;
        this.formState.$.password.onChangeHandler(e, data);

        if (pswrdConfirmField.dirty) {
            pswrdConfirmField.validate();
        }
    };
}
