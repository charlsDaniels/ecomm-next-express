import Typography from "@mui/material/Typography";
import Link from "next/link";

const Brand = () => {
  return (
    <Link href="/">
      <Typography
        variant="h4"
        noWrap
        sx={{
          color: "#000",
          textDecoration: "none",
        }}
      >
        CharlTops
      </Typography>
    </Link>
  );
};

export default Brand;
