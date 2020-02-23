import { observable, action } from 'mobx';
import { injectable } from '@servicetitan/react-ioc';

@injectable()
export class AuthStore {
    @observable
    redirectToLogin = false;

    @observable
    loginToShow: string = '';

    @action
    gotRegistered = (login: string): void => {
        this.redirectToLogin = true;
        this.loginToShow = login;
    };

    @action
    reset = (): void => {
        this.redirectToLogin = false;
    };
}
