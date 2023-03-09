export const getPhotoUrl = (farm, server, id, secret) => {
  return new URL(`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`);
};
