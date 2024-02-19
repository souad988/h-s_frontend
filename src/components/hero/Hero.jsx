import React from "react";
import { Button, Box, Typography, useTheme } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./Slider.css";
import hero1 from "../../hero1.png";
// import model1 from "../../model1.png";
// import model2 from "../../model2.png";

export default function Hero() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        pt: 2,
        mt: 2.5,
        display: "flex",
        alignItems: "center",
        // backgroundColor: "#9caeb0",
      }}
    >
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={hero1}
            style={{
              width: "50%",
              right: "10%",
              // height: "3rem",
            }}
            alt=""
          />
          <Box
            sx={{
              [theme.breakpoints.up("sm")]: {
                position: "absolute",
                top: "30%",
                left: "10%",
                textAlign: "left",
              },
              [theme.breakpoints.down("sm")]: {
                textAlign: "center",
                pt: 4,
                pb: 6,
              },
            }}
          >
            <Typography
              sx={{
                color: "#222",
              }}
              variant="h5"
            >
              New Collection
            </Typography>
            <Typography
              sx={{
                color: "#222",
                fontweight: 400,
                my: 1,
              }}
              variant="h4"
            >
              Women
            </Typography>

            <Button
              sx={{
                px: 5,
                py: 1,
                mt: 2,
                backgroundColor: "#E17621",
                boxshadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                borderRadius: "1px",
                "&:hover": {
                  bgcolor: "#151515",
                  boxShadow: "0px 4px 16px rgba(43, 52, 69, 0.1)",
                },
              }}
              variant="contained"
            >
              Shop Now
            </Button>
          </Box>
        </SwiperSlide>
      </Swiper>
    </Box>
  );
}
