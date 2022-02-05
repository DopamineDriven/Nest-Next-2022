import * as os from "os";

export const config = { rpc: true };

export type HostInfo = {
  now: string;
  hostname: string;
};

export async function getInfo(): Promise<HostInfo> {
  return {
    now: new Date(Date.now()).toLocaleTimeString(
      ["en-US", "en-CA", "en-GB", "en-AU", "en-ZA"],
      {
        hour: "numeric",
        hourCycle: "h24",
        fractionalSecondDigits: 3,
        year: "numeric",
        timeZone: "America/Chicago"
      }
    ),
    hostname: os.hostname()
  };
}
