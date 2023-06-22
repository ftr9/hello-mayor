const formatTotalPostsNum = count => {
  if (count > 15) {
    return '15+';
  }
  return count;
};

export default formatTotalPostsNum;
