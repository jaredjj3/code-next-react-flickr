import React from "react";
import { getPhotoUrl } from "../util/getPhotoUrl";

export const Photo = props => {
  const url = getPhotoUrl(
    props.photo.farm,
    props.photo.server,
    props.photo.id,
    props.photo.secret
  );
  return <img src={url} alt={props.photo.title} />;
};
