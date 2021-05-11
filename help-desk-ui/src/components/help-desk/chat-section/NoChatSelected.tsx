import React, { FC } from "react";
import { Typography } from "@material-ui/core";

const NoChatSelected: FC = (props) => {
  return (
    <div style={{ flexDirection: "column" }}>
      <Typography style={{ fontWeight: "bolder" }} variant={"h5"}>
        No message selected
      </Typography>
      <Typography
        style={{ opacity: "75%", lineHeight: "2.5rem" }}
        variant={"body1"}
      >
        Select a message on left
      </Typography>
    </div>
  );
};

export default NoChatSelected;
