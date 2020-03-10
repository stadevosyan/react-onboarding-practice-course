import { AxiosResponse } from 'axios';

const mockAxiosResponse = async <T>(data: T, status: number): Promise<AxiosResponse<T>> => {
    return {
        data,
        status,
        statusText: '',
        headers: [],
        config: {}
    };
};

export const handleResponse = <T>(data: T) => {
    let status: number;
    if (data !== undefined) {
        status = 200;
    } else {
        status = 404;
    }

    return mockAxiosResponse(data, status);
};
