import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { ContactDetails } from "../../interface/contact";

type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

const INITIAL_VALUES: ContactDetails = {
  fullName: "",
  mobileNumber: "",
  email: "",
};

// Accepts 09XXXXXXXXX or +639XXXXXXXXX
const PH_MOBILE_REGEX = /^(09|\+639)\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = (values: ContactDetails): ContactErrors => {
  const errors: ContactErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Full name is required.";
  }

  const mobile = values.mobileNumber.replace(/[\s-]/g, "");
  if (!mobile) {
    errors.mobileNumber = "Mobile number is required.";
  } else if (!PH_MOBILE_REGEX.test(mobile)) {
    errors.mobileNumber = "Use 09XXXXXXXXX or +639XXXXXXXXX format.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
};

const ContactForm: FC = (): ReactElement => {
  const [values, setValues] = useState<ContactDetails>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    // TODO: replace with API call once the backend is available
    console.log("Contact request:", {
      fullName: values.fullName.trim(),
      mobileNumber: values.mobileNumber.replace(/[\s-]/g, ""),
      email: values.email.trim(),
    });
    setIsSubmitted(true);
    setValues(INITIAL_VALUES);
  };

  if (isSubmitted) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h2 className="text-xl font-medium text-gray-900">Thank you!</h2>
        <p className="mt-2 text-gray-600">
          We received your details and will contact you shortly.
        </p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          Send another request
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof ContactDetails) =>
    `mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-700 ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg bg-white p-6 shadow"
    >
      <h2 className="text-xl font-medium text-gray-900">Get in touch</h2>
      <p className="mt-1 text-sm text-gray-600">
        Leave your details and our team will reach out to you.
      </p>

      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            value={values.fullName}
            onChange={handleChange}
            className={inputClass("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="mobileNumber"
            className="text-sm font-medium text-gray-700"
          >
            Mobile number
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            autoComplete="tel"
            placeholder="09XXXXXXXXX"
            value={values.mobileNumber}
            onChange={handleChange}
            className={inputClass("mobileNumber")}
          />
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            className={inputClass("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
      >
        Submit
      </button>
    </form>
  );
};

export default ContactForm;
