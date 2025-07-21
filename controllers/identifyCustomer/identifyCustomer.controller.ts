import { NextFunction, Request, Response } from "express";
import { IdentifyReqBody, IdentifyResponse } from "./identifyCustomer.types.ts";

export const identify = async (req: Request<{}, any, IdentifyReqBody>, res: Response<IdentifyResponse>, next: NextFunction) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            return res.status(400).json({ 
                isSuccess: false,
                message: "email or phoneNumber required"
            });
        }


        res.json({
            isSuccess: true,
            message: "Contact identified successfully",
            data: {
                contact: {
                    primaryContactId: 1,
                    emails: [],
                    phoneNumbers: [],
                    secondaryContactIds: []
                }
            }
        });
    } catch (err) {
        next(err);
    }
};