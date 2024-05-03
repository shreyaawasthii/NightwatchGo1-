let Login = browser.page.Login();
let MyActivity = browser.page.MyActivity();

describe('LoginPage Verification', () => {
    beforeEach((browser) => {
        browser
        .window.maximize()
        .url('https://nashtechglobal.qa.go1percent.com/')

});

afterEach(async (browser) => {
  browser.end();
});

  it('Verify "Go1Percent" logo, carousel images, carousel caption and the footer message should be displayed on login page', function(browser) {
    Login
      .expect.element('@goLogo').to.be.present
    Login
      .expect.element('@oneLogo').to.be.present
    browser
      .assert.carouselImageCount(4)
      .assert.carouselCaption('.carousel-inner .item.active .carousel-caption', 'Get 1% Better Everyday')
      .assert.footerMessage('.tagsss', 'Made with at Nashtech.')
    
  });


  it('Verify carousel image changes when clicking on carousel buttons', async function (browser) {
      Login.expect.element('@carousel').to.be.present
      Login.waitForElementVisible('@carouselButton1',20000)
      .focusClick("css", "ol.carousel-indicators > li[data-target='#myCarousel']:nth-child(1)", false)
      .assert.carouselImageChange('@carouselImage')
      .waitForElementVisible('@carouselButton2',20000)
      .focusClick("css", "ol.carousel-indicators > li[data-target='#myCarousel']:nth-child(2)", false)
      .assert.carouselImageChange('@carouselImage');
  });


  it('Verify that specific text is present between login options on the web page', function (browser) {
    Login
        .expect.element('@emailOptionText').text.to.contain('or do it via E-mail');
  });


  it('Verify that login page heading contains text "Sign in to Go 1%"', function (browser) {
    Login.expect.element('@pageTitle').text.to.equal('Sign in to Go 1%');
  });


  it('Verify that clicking on the Microsoft logo redirects to the Microsoft login page', function (browser) {
    Login
      .waitForElementVisible('@microsoftLogo', 20000)
      .execute(() => {
        document.querySelector("#social-oidc").click();
      })
      .assert.urlContains("//login.microsoftonline.com/");
    browser.back();
  });


  it('Verify that login fails with invalid credentials and an alert message is displayed', function (browser) {
    Login
      .loginWithCredentials('invalid_username', 'invalid_password')
      .assert.visible('@inputError') 
      .assert.containsText('@inputError', 'Invalid username or password.');
  });


  it('Verify successful login with valid credentials', function (browser) {
    Login
      .loginWithCredentials('temp_test_user', '8ZgC8^?c6m')
    MyActivity
      .clickSettings()
      .clickLogout()
  });

  it('Verify remember me checkbox is selected during login', function (browser) {
    Login
    .checkRememberMeCheckbox('username', 'password')
    .expect.element('#rememberMe').to.be.selected.before(100);
  });

  it('Verify the forgot Password functionality', function (browser) {
    Login
      .expect.element('@forgotPasswordLink').text.to.equal('Forgot Password?')
    Login
      .checkForgotPasswordFunctionality('testUser')
   });

    it('Verify clicking on the "Terms of Use" link opens a new page with the terms of use', async function (browser) {
        Login.expect.element('@termsOfUseLink').to.be.present;
    
        Login.clickTermsOfUseLink();
    
        await browser.waitUntil(async function () {
          const windowHandles = await browser.window.getAllHandles();
    
          return windowHandles.length === 2;
        });
    
        const originalWindow = await browser.window.getHandle();
        const allWindows = await browser.window.getAllHandles();
    
        // loop through available windows to find the new window handle
        for (const windowHandle of allWindows) {
          if (windowHandle !== originalWindow) {
            await browser.window.switchTo(windowHandle);
            break;
          }
        }
        const currentWindow = await browser.window.getHandle();
        await browser.assert.notEqual(currentWindow, originalWindow);
        
    });

  it('Verify clicking on the "Privacy policy" link opens a new page with the privacy policy', async function (browser) {
  Login.waitForElementVisible('@privacyPolicyLink');
  Login.clickPrivacyPolicyLink();

  await browser.waitUntil(async function () {
    const windowHandles = await browser.window.getAllHandles();

    return windowHandles.length === 2;
  });

  const originalWindow = await browser.window.getHandle();
  const allWindows = await browser.window.getAllHandles();

  // loop through available windows to find the new window handle
  for (const windowHandle of allWindows) {
    if (windowHandle !== originalWindow) {
      await browser.window.switchTo(windowHandle);
      break;
    }
  }
  const currentWindow = await browser.window.getHandle();
  await browser.assert.notEqual(currentWindow, originalWindow);
  
  });

});




