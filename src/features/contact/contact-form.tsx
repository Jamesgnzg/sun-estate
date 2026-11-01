import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { ContactDetails } from "../../interface/contact";
import { CONTACT_ERRORS, CONTACT_LABELS } from "../../constants/labels";

type ContactErrors = Partial<Record<keyof ContactDetails, string>>;

const INITIAL_VALUES: ContactDetails = {
  fullName: "",
  mobileNumber: "",
  email: "",
};

// Accepts 09XXXXXXXXX or +639XXXXXXXXX
const PH_MOBILE_REGEX = /^(09|\+639)\d{9}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const {
  FULL_NAME_REQUIRED,
  MOBILE_REQUIRED,
  MOBILE_INVALID,
  EMAIL_REQUIRED,
  EMAIL_INVALID,
} = CONTACT_ERRORS;

const validate = (values: ContactDetails): ContactErrors => {
  const errors: ContactErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = FULL_NAME_REQUIRED;
  }

  const mobile = values.mobileNumber.replace(/[\s-]/g, "");
  if (!mobile) {
    errors.mobileNumber = MOBILE_REQUIRED;
  } else if (!PH_MOBILE_REGEX.test(mobile)) {
    errors.mobileNumber = MOBILE_INVALID;
  }

  if (!values.email.trim()) {
    errors.email = EMAIL_REQUIRED;
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = EMAIL_INVALID;
  }

  return errors;
};

const ContactForm: FC = (): ReactElement => {
  const {
    SUCCESS_TITLE,
    SUCCESS_MESSAGE,
    SEND_ANOTHER,
    FORM_TITLE,
    FORM_SUBTITLE,
    FULL_NAME,
    MOBILE_NUMBER,
    MOBILE_PLACEHOLDER,
    EMAIL,
    SUBMIT,
  } = CONTACT_LABELS;
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
        <h2 className="text-xl font-medium text-gray-900">{SUCCESS_TITLE}</h2>
        <p className="mt-2 text-gray-600">{SUCCESS_MESSAGE}</p>
        <button
          type="button"
          onClick={() => setIsSubmitted(false)}
          className="mt-4 rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-700"
        >
          {SEND_ANOTHER}
        </button>
      </div>
    );
  }

  const inputClass = (field: keyof ContactDetails) =>
    `mt-1 w-full rounded-md border px-3 py-2 focus:outline-none focus:input-ring ${
      errors[field] ? "border-red-500" : "border-gray-300"
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-lg bg-white p-6 shadow"
    >
      <h2 className="text-xl font-medium text-gray-900">{FORM_TITLE}</h2>
      <p className="mt-1 text-sm text-gray-600">{FORM_SUBTITLE}</p>

      <div className="mt-4 space-y-4">
        <div>
          <label
            htmlFor="fullName"
            className="text-sm font-medium text-gray-700"
          >
            {FULL_NAME}
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
            {MOBILE_NUMBER}
          </label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            autoComplete="tel"
            placeholder={MOBILE_PLACEHOLDER}
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
            {EMAIL}
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

      <button type="submit" className="mt-6 w-full btn-primary">
        {SUBMIT}
      </button>
    </form>
  );
};

export default ContactForm;
