import bcrypt from "bcrypt";

export const compareHashes = (plaintextPassword, hash) => {
  return bcrypt.compareSync(plaintextPassword, hash);
};
