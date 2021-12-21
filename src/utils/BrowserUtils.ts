import Cookies from "js-cookie";
import { compress, decompress } from "lz-string";

export enum CookieNames {
  ACCESS_TOKEN_COOKIE_NAME = "access_token",
  REFRESH_TOKEN_COOKIE_NAME = "refresh_token",
  ACCESS_TOKEN_TYPE_COOKIE_NAME = "access_token_type",
  USER_ID_COOKIE_NAME = "user_id",
  USER_NAME_COOKIE_NAME = "user_name",
  USER_EMAIL_COOKIE_NAME = "user_email",
}

export const setCookie = (name: CookieNames, value: string) => {
  removeCookie(name);
  Cookies.set(name, value);
};

export const removeCookie = (name: CookieNames) => Cookies.remove(name);

export const getCookie = (name: CookieNames) => Cookies.get(name);

export const makeNumberTwoDigit = (x: number) => {
  if (x.toString().length === 1) {
    return "0" + x;
  }
  return x;
};

export const getFormattedDate = (dateCreated: number) => {
  const date = new Date(dateCreated);
  return `${makeNumberTwoDigit(date.getDate())}/${makeNumberTwoDigit(date.getMonth())}/${makeNumberTwoDigit(
    date.getFullYear()
  )}, ${makeNumberTwoDigit(date.getHours())}:${makeNumberTwoDigit(date.getMinutes())}`;
};

export const hashString = (s: string) => {
  let hash: number = 0;
  let hashConstant: number = 11;
  let mod = 1e9 + 7;
  let power = hashConstant;
  for (let c of s) {
    let hashValue = ((c.charCodeAt(0) - "A".charCodeAt(0) + 1) * power) % mod;
    power %= mod;
    hash += hashValue;
  }

  return hash;
};

export const isWithinIntervals = (intervals: number[][], target: number) =>
  intervals.filter((interval) => interval[0] <= target && interval[1] > target && interval[0] !== -1 && interval[1] !== -1).length >= 1;

export const currentFormattedDate = () => {
  const date = new Date();
  return `${date.getFullYear()}-${makeNumberTwoDigit(date.getMonth() + 1)}-${makeNumberTwoDigit(date.getDate())}`;
};

export const currentFormattedTime = () => {
  const date = new Date();
  return `${makeNumberTwoDigit(date.getHours())}:${makeNumberTwoDigit(date.getMinutes())}:${makeNumberTwoDigit(date.getSeconds())}`;
};

export const getFutureFormattedTime = (minutesDelay: number) => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + minutesDelay);
  return `${makeNumberTwoDigit(date.getHours())}:${makeNumberTwoDigit(date.getMinutes())}:00`;
};

export const redirectTo = (link: string) => (window.location.href = link);

export const getMediaConstraints = (video: boolean, audio: boolean) => ({ video, audio });

export const compressString = (str: string) => compress(str);

export const uncompressString = (str: string) => decompress(str);
