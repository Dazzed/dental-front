import browser from 'bowser';

const warning = `We've noticed you are using Internet Explorer. Microsoft no longer supports this browser and we cannot guarantee your experience on our site, We suggest you upgrade to Edge or use either Chrome or Firefox.`; // eslint-disable-line

const browserDetector = {
  isOld: () => browser.msie,
  warning,
};

export default browserDetector;
