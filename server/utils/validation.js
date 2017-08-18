var isRealString = (str) => { // function tocheck if str is a string
  return typeof str === 'string' && str.trim().length > 0;
};


module.exports = {
  isRealString
};
