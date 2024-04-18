const bcrypt = require("bcrypt");

module.exports = {
  hashText: async (text, salt) => {
    try {
      const hashedText = await bcrypt.hash(text, salt);
      return hashedText;
    } catch (error) {
      console.error("Error hashing text:", error);
      throw error;
    }
  },
  compareHashes: async (text, hashedText) => {
    try {
      const result = await bcrypt.compare(text, hashedText);
      return result;
    } catch (error) {
      console.error("Error comparing texts", error);
      throw error;
    }
  },
};
