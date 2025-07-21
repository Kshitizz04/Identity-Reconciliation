import CommonResponse from "../../types/CommonResponse";
import { Message } from './../../node_modules/esbuild/lib/main.d';

export interface IdentifyReqBody {
    email?: string;
    phoneNumber?: string;
}

export interface IdentifyResBody {
  contact: {
    primaryContactId: number; 
    emails: string[];         
    phoneNumbers: string[];   
    secondaryContactIds: number[]; 
  };
}

export interface IdentifyResponse extends CommonResponse<IdentifyResBody> {}

