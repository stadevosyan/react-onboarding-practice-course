import { AxiosResponse } from 'axios';

export const mockAxiosResponse = async <T>(data: T, status: number): Promise<AxiosResponse<T>> => {
    return {
        data,
        status,
        statusText: '',
        headers: [],
        config: {}
    };
};
