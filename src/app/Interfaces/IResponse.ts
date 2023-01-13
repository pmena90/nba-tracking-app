import { IResponseMetadata } from "./IResponseMetadata";

export interface IResponse<T> {
    data?: T;
    meta?: IResponseMetadata;
}