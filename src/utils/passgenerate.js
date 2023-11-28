import bcrypt from "bcrypt";

export const passwordGenerate = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const generatedPass = await bcrypt.hash(password, salt);
  return generatedPass;
};
