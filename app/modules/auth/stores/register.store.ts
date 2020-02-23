import { AuthStore } from './auth.store';
import { injectable, inject } from '@servicetitan/react-ioc';
import { observable, action } from 'mobx';

import {
    InputFieldState,
    DropdownFieldState,
    FormValidators,
    formStateToJS
} from '@servicetitan/form';
import { FormState } from 'formstate';
import { UserRole } from '../../common/enums/user-role';
import { AuthApi } from './../api/auth.api';

const ERRORS = {
    minLength: 'should be at least 3 characters',
    match: 'Passwords must match',
    strongPassword:
        '* password must be at least 8 characters long including a number, a lowercase letter, and an uppercase letter'
};

@injectable()
export class RegisterStore {
    private login = new InputFieldState('')
        .validators(FormValidators.required, val => val.length <= 3 && ERRORS.minLength)
        .disableAutoValidation();
    private password = new InputFieldState('')
        .validators(val => {
            return !FormValidators.passwordIsValidFormat(val) && ERRORS.strongPassword;
        })
        .disableAutoValidation();
    private passwordConfirm = new InputFieldState('').disableAutoValidation();
    private role = new DropdownFieldState<UserRole>(UserRole.Public).disableAutoValidation();

    private passwordDuo = new FormState({
        password: this.password,
        passwordConfirm: this.passwordConfirm
    }).validators(state => {
        if (state.password.value !== state.passwordConfirm.value) {
            state.passwordConfirm.setError(' ');
            state.password.setError(ERRORS.match);

            return ERRORS.match;
        }

        return null;
    });

    @observable
    formState = new FormState({
        login: this.login,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        role: this.role,
        passwordDuo: this.passwordDuo
    });

    @observable
    registerError = '';

    @action setError = (errMsg: string): void => {
        this.registerError = errMsg;
    };

    @observable
    loginError = '';

    constructor(
        @inject(AuthStore) private authStore: AuthStore,
        @inject(AuthApi) private authApi: AuthApi
    ) {
        this.authStore.reset();
    }

    @action
    register = async () => {
        const validation = await this.formState.validate();
        if (validation.hasError) {
            return;
        }

        const mappedFormData = formStateToJS(this.formState);

        const result = await this.authApi.register(mappedFormData);

        if (result.status === 200) {
            this.setError('');
            this.authStore.gotRegistered(result.data.login);
        } else {
            this.setError('Username is taken');
        }
    };
}
