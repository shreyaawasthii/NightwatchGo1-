// Refer to the online docs for more details:
// https://nightwatchjs.org/gettingstarted/configuration/
//

//  _   _  _         _      _                     _          _
// | \ | |(_)       | |    | |                   | |        | |
// |  \| | _   __ _ | |__  | |_ __      __  __ _ | |_   ___ | |__
// | . ` || | / _` || '_ \ | __|\ \ /\ / / / _` || __| / __|| '_ \
// | |\  || || (_| || | | || |_  \ V  V / | (_| || |_ | (__ | | | |
// \_| \_/|_| \__, ||_| |_| \__|  \_/\_/   \__,_| \__| \___||_| |_|
//             __/ |
//            |___/

module.exports = {
  // An array of folders (excluding subfolders) where your tests are located;
  // if this is not specified, the test source must be passed as the second argument to the test runner.
  src_folders: ['test','nightwatch/examples'],

  // See https://nightwatchjs.org/guide/concepts/page-object-model.html
  page_objects_path: ['nightwatch/page-objects'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-commands.html
  custom_commands_path: ['nightwatch/custom-commands'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-custom-assertions.html
  custom_assertions_path: ['nightwatch/custom-assertions'],

  // See https://nightwatchjs.org/guide/extending-nightwatch/adding-plugins.html
  plugins: [],
  
  // See https://nightwatchjs.org/guide/concepts/test-globals.html
  globals_path: '',
  
  webdriver: {},

  test_workers: {
    enabled: true
  },

  test_settings: {
    default: {
      disable_error_log: false,
      launch_url: 'https://nashtechglobal.qa.go1percent.com/',

      screenshots: {
        enabled: false,
        path: 'screens',
        on_failure: true
      },

      desiredCapabilities: {
        browserName: 'chrome'
      },
      
      webdriver: {
        start_process: true,
        server_path: ''
      },
      
    },
    
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          // More info on Chromedriver: https://sites.google.com/a/chromium.org/chromedriver/
          //
          // w3c:false tells Chromedriver to run using the legacy JSONWire protocol (not required in Chrome 78)
          w3c: true,
          args: [
            //'--no-sandbox',
            //'--ignore-certificate-errors',
            //'--allow-insecure-localhost',
            //'--headless'
          ]
        }
      },

      webdriver: {
        start_process: true,
        server_path: '',
        cli_args: [
          // --verbose
        ]
      }
    },
    
    ////////////////////////////////////////////////////////////////////////////////////////
    // Configuration for using remote Selenium service or a cloud-based testing provider.  |
    //                                                                                     |
    // Please set the hostname and port of your remote selenium-server or cloud-provider   |
    // (by setting the following properties in the configuration below):                   |
    // - `selenium.host`                                                                   |
    // - `selenium.port`                                                                   |
    //                                                                                     |
    // If you are using a cloud provider such as CrossBrowserTesting, LambdaTests, etc.,   |
    // please set the username and access_key by setting the below environment variables:  |
    // - REMOTE_USERNAME                                                                   |
    // - REMOTE_ACCESS_KEY                                                                 |
    // (.env files are supported)                                                          |
    ////////////////////////////////////////////////////////////////////////////////////////
    remote: {
      // Info on all the available options with "selenium":
      // https://nightwatchjs.org/guide/configuration/settings.html#selenium-server-settings
      selenium: {
        start_process: false,
        server_path: '',
        host: '<remote-hostname>',
        port: 4444
      },

      username: '${REMOTE_USERNAME}',
      access_key: '${REMOTE_ACCESS_KEY}',

      webdriver: {
        keep_alive: true,
        start_process: false
      }
    },
    
    'remote.chrome': {
      extends: 'remote',
      desiredCapabilities: {
        browserName: 'chrome',
        'goog:chromeOptions': {
          w3c: true
        }
      }
    },
    
  },
  
};
