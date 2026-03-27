import { applicationSchema }    from "./application";
import { contactMessageSchema } from "./contactMessage";
import { siteSettingsSchema }   from "./siteSettings";

export const schemaTypes = [siteSettingsSchema, applicationSchema, contactMessageSchema];
