import ReactGA from "react-ga";

export const logPageView = () => {
  ReactGA.initialize({ trackingId: process.env.GA_TRACKING_ID });
  ReactGA.pageview("/");
};
