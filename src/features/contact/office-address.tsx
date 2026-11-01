import { FC, ReactElement } from "react";
import { CONTACT_LABELS } from "../../constants/labels";

const OfficeAddress: FC = (): ReactElement => {
  const { OFFICE_TITLE, OFFICE_ADDRESS, MAP_TITLE } = CONTACT_LABELS;
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-medium text-gray-900">
        {OFFICE_TITLE}
      </h2>
      <address className="mt-2 not-italic text-gray-600">{OFFICE_ADDRESS}</address>
      <iframe
        title={MAP_TITLE}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(
          OFFICE_ADDRESS
        )}&output=embed`}
        className="mt-4 h-72 w-full rounded-md border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default OfficeAddress;
