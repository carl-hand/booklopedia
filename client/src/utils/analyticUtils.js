import ReactGA from "react-ga";
import dotenv from "dotenv";

dotenv.config();

export const logPageView = () => {
  ReactGA.initialize(process.env.GA_TRACKING_ID);
  ReactGA.pageview("/");
};
