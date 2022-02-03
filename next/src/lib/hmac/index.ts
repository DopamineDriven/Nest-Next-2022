import crypto from "crypto";

const metaverse = {
  accessToken: process.env.FACEBOOK_ACCESS_TOKEN ?? "",
  secretKey: process.env.FACEBOOK_SECRET ?? ""
};

// zuccc's graph fun
export function signHmacSha512(key: string, secret: string) {
  key = metaverse.accessToken;
  secret = metaverse.secretKey;
  const hmac = crypto.createHmac("sha512", key);
  const signed = hmac.update(Buffer.from(secret, "utf-8")).digest("hex");
  return signed;
}
