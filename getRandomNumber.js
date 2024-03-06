const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

console.log("Random number is:", getRandomNumber(1, 1000));

export default getRandomNumber;
