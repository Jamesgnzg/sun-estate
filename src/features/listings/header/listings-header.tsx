import { FC, ReactElement } from "react";
import ViewButtons from "./view-buttons";

const ListingsHeader: FC = (): ReactElement => {
  return (
    <>
      <div className="p-3 border bg-neutral-50">
        <div className="flex justify-between">
          <p className="mt-3">Header</p>
          <ViewButtons />
        </div>
      </div>
    </>
  );
};

export default ListingsHeader;
