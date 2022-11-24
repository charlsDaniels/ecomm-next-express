import Typography from "@mui/material/Typography";
import Link from "next/link";

const Brand = () => {
  return (
    <Link href="/">
      <Typography
        variant="h4"
        noWrap
        sx={{
          // display: "flex",
          // flexGrow: 0.8,
          fontFamily: "monospace",
          fontWeight: 700,
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
