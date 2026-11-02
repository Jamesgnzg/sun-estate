import { IconButton } from "@mui/material";
import { FC, ReactElement, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { LISTINGS_LABELS } from "../../../../constants/labels";

interface FavoriteButtonProps {
  className?: string;
}

const FavoriteButton: FC<FavoriteButtonProps> = ({
  className,
}: FavoriteButtonProps): ReactElement => {
  const { FAVORITE } = LISTINGS_LABELS;
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <IconButton
      aria-label={FAVORITE}
      aria-pressed={isFavorite}
      className={className}
      onClick={() => setIsFavorite((prev) => !prev)}
    >
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "#f53431" }} />
      ) : (
        <FavoriteBorderIcon />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
