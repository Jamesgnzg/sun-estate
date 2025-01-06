import { Button, Divider } from "@mui/material";
import { FC, memo, ReactElement } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import { Estate } from "../../../interface/estate";

interface TileCardsProps {
  estate: Estate;
}
const TileCards: FC<TileCardsProps> = ({
  estate,
}: TileCardsProps): ReactElement => {
  const convertToDollarFormat = (price: number): string => {
    let USDollar = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });

    return USDollar.format(price);
  };

  return (
    <div className="w-72 bg-neutral-50 border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <img
        className="w-full h-auto rounded-t-xl"
        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
        alt="Card Image"
      />
      <div className="p-3">
        <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-white">
          {convertToDollarFormat(estate.price)}
        </h3>
        <div className="flex p-2 gap-2">
          <div className="flex border rounded-lg gap-2 py-1 px-2 bg-neutral-50">
            <BedRoundedIcon />
            <p>{estate.bedroom}</p>
          </div>
          <div className="flex border rounded-lg gap-2 py-1 px-2 bg-neutral-50">
            <BathtubOutlinedIcon />
            <p>{estate.bathroom}</p>
          </div>
          <div className="flex border rounded-lg gap-1 py-1 px-2 bg-neutral-50">
            <OpenWithRoundedIcon />
            <p>{`${estate.area} m²`}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex gap-5 p-3 md:p-3">
        <Button className="w-72 bg-red-500 rounded-lg" variant="contained">
          Chat Agent
        </Button>
        <Button
          className="bg-gray-100 rounded-lg text-black"
          variant="contained"
        >
          <FavoriteBorderIcon />
        </Button>
      </div>
    </div>
  );
};

export default memo(TileCards);
