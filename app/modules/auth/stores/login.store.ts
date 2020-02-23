import { AuthStore } from './auth.store';
import { AppUserStore } from './../../common/stores/user.store';
import { AuthApi } from './../api/auth.api';
import { injectable, inject } from '@servicetitan/react-ioc';
import { observable, action } from 'mobx';

import { InputFieldState, FormValidators, formStateToJS } from '@servicetitan/form';
import { FormState } from 'formstate';

const ERRORS = {
    minLength: 'should be at least 3 characters',
    strongPassword:
        '* password must be at least 8 characters long including a number, a lowercase letter, and an uppercase letter'
};
@injectable()
export class LoginStore {
    @observable
    formState = new FormState({
        login: new InputFieldState('').validators(
            FormValidators.required,
            val => val.length <= 3 && ERRORS.minLength
        ),
        password: new InputFieldState('').validators(
            val => !FormValidators.passwordIsValidFormat(val) && ERRORS.strongPassword
        )
    });

    @observable
    loginError = '';

    constructor(
        @inject(AppUserStore) private appUserStore: AppUserStore,
        @inject(AuthStore) private authStore: AuthStore,
        @inject(AuthApi) private authApi: AuthApi
    ) {
        if (this.authStore.loginToShow) {
            this.formState.$.login.value = this.authStore.loginToShow;
            this.authStore.reset();
        }
    }

    @action setError = (errMsg: string): void => {
        this.loginError = errMsg;
    };

    @action
    populateLogin = (login: string): void => {
        this.formState.$.login.value = login;
    };

    @action
    login = async () => {
        const validation = await this.formState.validate();
        if (validation.hasError) {
            return;
        }

        const mappedFormData = formStateToJS(this.formState);
        const result = await this.authApi.login(mappedFormData);

        if (result.status === 200) {
            this.setError('');
            this.appUserStore.setAppUser(result.data);
        } else {
            this.setError('Incorrect username or password');
        }
    };
}
