import { injectable } from '@servicetitan/react-ioc';
import { observable, action } from 'mobx';

import { InputFieldState, FormValidators } from '@servicetitan/form';
import { FormState } from 'formstate';

@injectable()
export class LoginStore {
    @observable
    formState = new FormState({
        login: new InputFieldState('').validators(
            FormValidators.required,
            val => val.length <= 3 && 'should be at least 3 characters'
        ),
        password: new InputFieldState('').validators(
            val =>
                !FormValidators.passwordIsValidFormat(val) &&
                '* password must be at least 8 characters long including a number, a lowercase letter, and an uppercase letter'
        )
    });

    @action
    login = async () => {
        const validation = await this.formState.validate();
        if (validation.hasError) {
            return;
        }
    };
}
