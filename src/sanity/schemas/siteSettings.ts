import { defineField, defineType } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "MINC Pay",
      validation: (R) => R.required(),
    }),

    defineField({
      name: "supportEmail",
      title: "Support Email",
      type: "string",
      validation: (R) => R.required().email(),
    }),

    defineField({
      name: "supportPhoneDisplay",
      title: "Support Phone (Display)",
      description: "Human-friendly number shown on the site.",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "supportPhoneE164",
      title: "Support Phone (E.164)",
      description: "Used for tel: links, e.g. +27820000000",
      type: "string",
      validation: (R) => R.required().regex(/^\+\d{7,15}$/, {
        name: "e164",
        invert: false,
      }),
    }),

    defineField({
      name: "whatsAppNumberE164",
      title: "WhatsApp Number (E.164)",
      description: "Used to build wa.me links, e.g. +27820000000",
      type: "string",
      validation: (R) => R.required().regex(/^\+\d{7,15}$/, {
        name: "e164",
        invert: false,
      }),
    }),

    defineField({
      name: "supportHours",
      title: "Support Hours",
      type: "string",
      initialValue: "Mon–Fri, 8am–5pm SAST",
    }),

    defineField({
      name: "addressLine1",
      title: "Address Line 1",
      type: "string",
    }),
    defineField({
      name: "addressLine2",
      title: "Address Line 2",
      type: "string",
    }),
    defineField({ name: "city", title: "City", type: "string" }),
    defineField({ name: "region", title: "Region/Province", type: "string" }),
    defineField({ name: "postalCode", title: "Postal Code", type: "string" }),
    defineField({ name: "country", title: "Country", type: "string", initialValue: "South Africa" }),

    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
            defineField({ name: "url", title: "URL", type: "url", validation: (R) => R.required() }),
          ],
        },
      ],
    }),

    defineField({
      name: "legalLinks",
      title: "Legal Links",
      description: "Shown in the footer (e.g. Privacy Policy, Terms of Service).",
      type: "array",
      of: [
        {
          type: "object",
          name: "legalLink",
          fields: [
            defineField({ name: "label", title: "Label", type: "string", validation: (R) => R.required() }),
            defineField({ name: "href", title: "Href", type: "string", validation: (R) => R.required() }),
          ],
        },
      ],
      initialValue: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});

