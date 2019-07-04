import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
  URL: process.env.REACT_APP_URL
}

export const obj = Object.freeze(config);
