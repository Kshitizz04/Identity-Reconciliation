interface CommonResponse<T> {
    isSuccess: boolean;
    message: string;
    data?: T;
}
export default CommonResponse;