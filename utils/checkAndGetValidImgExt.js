const getValidImageExtension = (url = '') => {
  if (url.endsWith('.jpeg')) {
    return '.jpeg';
  }
  if (url.endsWith('.png')) {
    return '.png';
  }
  if (url.endsWith('.jpg')) {
    return '.jpg';
  }
  if (url.endsWith('.webp')) {
    return '.webp';
  }
  return null;
};
export default getValidImageExtension;
