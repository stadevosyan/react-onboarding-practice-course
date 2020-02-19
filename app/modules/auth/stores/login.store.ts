import { injectable } from '@servicetitan/react-ioc';
import { observable } from 'mobx';

import { InputFieldState } from '@servicetitan/form';
import { FormState } from 'formstate';

@injectable()
export class LoginStore {
    @observable
    formState = new FormState({
        login: new InputFieldState(''),
        password: new InputFieldState('')
    });
}
