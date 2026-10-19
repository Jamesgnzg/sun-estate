import { FC, ReactElement } from "react";

export const OFFICE_ADDRESS =
  "2 Workplus bldg, Chestnut Street, Kalumpang, Marikina City";

const OfficeAddress: FC = (): ReactElement => {
  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="text-xl font-medium text-gray-900">Our Office</h2>
      <address className="mt-2 not-italic text-gray-600">{OFFICE_ADDRESS}</address>
      <iframe
        title="Sun Estate office location"
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
