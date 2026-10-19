import { FC, ReactElement } from "react";
import ContactForm from "../features/contact/contact-form";
import OfficeAddress from "../features/contact/office-address";

const ContactUs: FC = (): ReactElement => {
  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="text-3xl font-medium text-gray-900">Contact Us</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <ContactForm />
        <OfficeAddress />
      </div>
    </div>
  );
};

export default ContactUs;
