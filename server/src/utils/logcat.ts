import moment from 'moment';

// allow app debug only in development mode
const ALLOW_DEBUG = process.env.NODE_ENV !== 'production';

const Console = {
  debug: (message: any, options?: any, ...optionalParams: any[]) => {
    if (ALLOW_DEBUG) {
      const date = moment().format('DD-MM-YYYY HH:mm:ss:SSSS');
      if (options) {
        console.log(`${date}: ${message}`, options, ...optionalParams);
      } else {
        console.log(`${date}: ${message}`);
      }
      console.log('');
    }
  },
  error: (message: any, options?: any, ...optionalParams: any[]) => {
    if (ALLOW_DEBUG) {
      const date = moment().format('DD-MM-YYYY HH:mm:ss:SSSS');
      if (options) {
        console.error(`${date}: ${message}`, options, ...optionalParams);
      } else {
        console.error(`${date}: ${message}`);
      }
      console.log('');
    }
  },
};

export default Console;
