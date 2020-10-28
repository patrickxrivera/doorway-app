import ReactGA from 'react-ga';
import config from '../config';

export const setupGoogleAnalytics = () => {
    ReactGA.initialize(config.googleAnalyticsId);
    ReactGA.pageview(window.location.pathname + window.location.search);
}