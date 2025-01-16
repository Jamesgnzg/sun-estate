import { Button, Divider, IconButton, Typography } from "@mui/material";
import { FC, ReactElement, memo } from "react";
import { Estate } from "../../../interface/estate";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BedRoundedIcon from "@mui/icons-material/BedRounded";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import OpenWithRoundedIcon from "@mui/icons-material/OpenWithRounded";
import { convertToDollarFormat } from "../../../utils/currency";

interface ListEstateProps {
  estate: Estate;
}

const ListEstate: FC<ListEstateProps> = ({
  estate,
}: ListEstateProps): ReactElement => {
  return (
    <>
      <div className="flex bg-neutral-50 border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
        <img
          className="h-auto rounded-t-xl"
          src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80"
          alt="Card Image"
        />
        <div className="flex flex-col w-full">
          <div className="p-3">
            <Typography
              component="h3"
              className="text-3xl mb-2 font-bold text-gray-800 dark:text-white"
            >
              {convertToDollarFormat(estate.price)}
            </Typography>
            <Typography
              component="h3"
              className="mb-2 text-lg font-bold text-gray-500 dark:text-white"
            >
              {estate.description}
            </Typography>
          </div>
          <div className="mt-auto">
            <Divider />
            <div className="flex justify-between p-3 md:p-3">
              <div className="flex gap-3">
                <div className="flex border rounded-lg gap-2 py-2 px-5 bg-neutral-50">
                  <BedRoundedIcon />
                  <p className="text-xs pt-1">{estate.bedroom}</p>
                </div>
                <div className="flex border rounded-lg gap-2 py-2 px-5 bg-neutral-50">
                  <BathtubOutlinedIcon />
                  <p className="text-xs pt-1">{estate.bathroom}</p>
                </div>
                <div className="flex border rounded-lg gap-1 py-2 px-5 bg-neutral-50">
                  <OpenWithRoundedIcon />
                  <p className="text-xs pt-1">{`${estate.area} m²`}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <IconButton aria-label="favorite">
                  <FavoriteBorderIcon />
                </IconButton>
                <Button
                  className="w-52 bg-red-500 rounded-lg"
                  variant="contained"
                >
                  Chat Agent
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ListEstate);
