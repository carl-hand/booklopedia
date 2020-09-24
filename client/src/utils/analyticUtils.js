import ReactGA from "react-ga";

export const logPageView = () => {
  ReactGA.initialize(process.env.GA_TRACKING_ID);
  ReactGA.pageview("/");
};
