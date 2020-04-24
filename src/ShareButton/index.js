import React from "react";
import Button from "react-bootstrap/Button";
import { recordAppShareClicked } from "../gaEvents";
import { shareApiIsAvailable } from "../utils";

const share = params => {
  recordAppShareClicked();
  navigator.share({
    title: params.title,
    text: params.text,
    url: params.url,
  });
};

const ShareButton = props => {
  const { children, title, url, text, ...restProps } = props;

  if (!shareApiIsAvailable()) {
    return null;
  }

  return (
    <Button
      {...restProps}
      onClick={() =>
        share({
          title: title,
          url: url,
          text: text,
        })
      }
    >
      {children}
    </Button>
  );
};

export default ShareButton;
