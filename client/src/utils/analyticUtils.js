import ReactGA from "react-ga";
import dotenv from "dotenv";

dotenv.config();

export const logPageView = () => {
  ReactGA.initialize({ trackingId: process.env.REACT_APP_GA_TRACKING_ID });
  ReactGA.pageview("/");
};
