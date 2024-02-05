import React from "react";
import {
  Box,
  Button,
  Container,
  Link,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";

export default function Hero() {
  return (
    <Container sx={{ mt: 2.5, display: "flex", alignItems: "center" }}>
      <Box flexGrow={1}>Hero</Box>
    </Container>
  );
}
