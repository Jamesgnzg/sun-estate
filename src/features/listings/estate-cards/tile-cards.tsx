import { Button, Divider, IconButton } from "@mui/material";
import { FC, memo, ReactElement } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import { convertToDollarFormat } from "../../../utils/currency";
import { Estate } from "../../../interface/estate";

interface TileCardsProps {
  estate: Estate;
}
const TileCards: FC<TileCardsProps> = ({
  estate,
}: TileCardsProps): ReactElement => {
  return (
    <div className="w-full bg-neutral-50 border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <img
        className="w-full h-auto rounded-t-xl"
        src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
        alt="Card Image"
      />
      <div className="p-1">
        <h3 className="mb-2 text-2xl pl-2 pt-1 font-bold text-gray-800 dark:text-white">
          {convertToDollarFormat(estate.price)}
        </h3>
        <div className="flex p-2 gap-2">
          <div className="flex border rounded-lg gap-2 py-1 px-2 bg-neutral-50">
            <BedRoundedIcon />
            <p className="text-xs pt-1">{estate.bedroom}</p>
          </div>
          <div className="flex border rounded-lg gap-2 py-1 px-2 bg-neutral-50">
            <BathtubOutlinedIcon />
            <p className="text-xs pt-1">{estate.bathroom}</p>
          </div>
          <div className="flex border rounded-lg gap-1 py-1 px-2 bg-neutral-50">
            <OpenWithRoundedIcon />
            <p className="text-xs pt-1">{`${estate.area} m²`}</p>
          </div>
        </div>
      </div>
      <Divider />
      <div className="flex gap-3 p-3 md:p-3">
        <Button className="w-72 bg-red-500 rounded-lg" variant="contained">
          Chat Agent
        </Button>
        <IconButton aria-label="favorite">
          <FavoriteBorderIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default memo(TileCards);
