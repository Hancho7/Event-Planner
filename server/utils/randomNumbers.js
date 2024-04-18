function generateRandomSixDigitNumber() {
  // Generate a random number between 0 and 999999
  const randomNumber = Math.floor(Math.random() * 1000000);

  // Ensure the number is exactly 6 digits by padding with zeros if necessary
  const paddedNumber = randomNumber.toString().padStart(6, "0");

  return paddedNumber;
}

module.exports = generateRandomSixDigitNumber;
