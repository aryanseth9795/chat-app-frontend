export const fileFormat = (url = "") => {
  const extension = url.split(".").pop();

  if (extension === "mp4" || extension === "webm" || extension === "ogg") {
    return "video";
  }

  if (extension === "mp3" || extension === "wav") {
    return "audio";
  }

  if (
    extension === "png" ||
    extension === "jpeg" ||
    extension === "jpg" ||
    extension === "gif"
  ) {
    return "image";
  }

  return "file";
};

export const TransformImage = (url = "", width = 100) => {
  return url;
};
