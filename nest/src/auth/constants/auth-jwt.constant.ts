export const jwtConstants = {
  secret: process.env.JWT_SECRET
    ? process.env.JWT_SECRET
    : "R_qzXGf0hvQj9Ih0lNz6Hrvt67vKTV6c-iIZF7dDlAE",
  signingKey: process.env.JWT_SIGNING_KEY ? process.env.JWT_SIGNING_KEY : "",
  signingKeyKid: process.env.JWT_SIGNING_KEY_KID
    ? process.env.JWT_SIGNING_KEY_KID
    : "",
  signingKeyAlg: process.env.JWT_SIGNING_KEY_ALG
    ? process.env.JWT_SIGNING_KEY_ALG
    : "HS512",
  signingKeyK: process.env.JWT_SIGNING_KEY_K
    ? process.env.JWT_SIGNING_KEY_K
    : ""
};
