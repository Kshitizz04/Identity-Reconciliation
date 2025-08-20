import { NextFunction, Request, Response } from "express";
import { IdentifyReqBody, IdentifyResBody } from "./identifyCustomer.types.js";
import { db } from "../../database/db.js";
import { contactsTable } from "../../database/schema.js";
import { eq, or } from "drizzle-orm";
import { CustomError } from "../../utils/CustomError.js";

export const identify = async (req: Request<{}, any, IdentifyReqBody>, res: Response<IdentifyResBody>, next: NextFunction) => {
    try {
        const { email, phoneNumber } = req.body;

        if (!email && !phoneNumber) {
            const error = new CustomError ("Email or phone number is required", 400);
            throw error;
        }

        const contacts = await db.select().from(contactsTable).where(
            or(
                email ? eq(contactsTable.email, email) : undefined,
                phoneNumber ? eq(contactsTable.phoneNumber, phoneNumber.toString()) : undefined
            )
        )

        let primaryContact: typeof contacts[0] | undefined;
        let allContacts: typeof contacts = [];

        if( contacts.length === 0){
            const [newContact] = await db.insert(contactsTable).values({
                email: email,
                phoneNumber: phoneNumber?.toString(),
                linkPrecedence: "primary"
            }).returning();
            primaryContact = newContact;
            allContacts = [newContact];

        } else {
            const primaryIds =  contacts.filter(contact => contact.linkPrecedence === "primary").map(contact => contact.id);
            const linkedId = contacts.find((c) => c.linkPrecedence === "secondary")?.linkedId ?? primaryIds[0];

            allContacts = await db.select().from(contactsTable).where(
                or(
                    eq(contactsTable.id, linkedId),
                    eq(contactsTable.linkedId, linkedId)
                )
            );

            primaryContact = allContacts.reduce((oldest, curr)=>{
                return curr.createdAt < oldest.createdAt ? curr : oldest;
            })

            if (!primaryContact) {
                const error = new CustomError ("Primary contact could not be determined", 500);
                throw error;
            }

            const otherPrimaries = allContacts.filter(
                (c) => c.linkPrecedence === "primary" && c.id !== primaryContact!.id
            );
            for (const secondary of otherPrimaries) {
                await db
                .update(contactsTable)
                .set({
                    linkPrecedence: "secondary",
                    linkedId: primaryContact.id,
                })
                .where(eq(contactsTable.id, secondary.id));
            }

            // 5. If partial match, create secondary
            const hasEmail = allContacts.some((c) => c.email === email);
            const hasPhone = allContacts.some((c) => c.phoneNumber === phoneNumber?.toString());
            if (
                (email && !hasEmail) ||
                (phoneNumber && !hasPhone)
            ) {
                const [newSecondary] = await db
                .insert(contactsTable)
                .values({
                    email,
                    phoneNumber: phoneNumber?.toString(),
                    linkPrecedence: "secondary",
                    linkedId: primaryContact.id,
                })
                .returning();
                allContacts.push(newSecondary);
            }
        }

        // Prepare response data
        const emails: string[] = [
            ...(primaryContact.email ? [primaryContact.email] : []),
            ...allContacts
                .filter((c) => c.email && c.email !== primaryContact.email)
                .map((c) => c.email as string),
        ];

        const phoneNumbers: string[] = [
            ...(primaryContact.phoneNumber ? [primaryContact.phoneNumber] : []),
            ...allContacts
                .filter((c) => c.phoneNumber && c.phoneNumber !== primaryContact.phoneNumber)
                .map((c) => c.phoneNumber as string),
        ];

        const secondaryContactIds = allContacts
        .filter((c) => c.linkPrecedence === "secondary")
        .map((c) => c.id);

        res.status(200).json({
            contact: {
            primaryContactId: primaryContact.id,
            emails,
            phoneNumbers,
            secondaryContactIds,
            },
        });
    } catch (err) {
        next(err);
    }
};