import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";

interface Props {
  messages: {
    title: string | null,
    description: string
  };
}

const Empty = ({ messages }: Props) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 5,
        mt: 10,
      }}
    >
      <Typography variant="h5" textAlign="center">
        {messages.title}
      </Typography>
      <Link href="/">
        <Typography
          variant="h5"
          noWrap
          sx={{
            flexGrow: 0.8,
            fontFamily: "monospace",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          {messages.description}
        </Typography>
      </Link>
    </Box>
  );
};

export default Empty;
