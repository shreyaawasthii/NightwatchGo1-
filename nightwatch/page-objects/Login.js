module.exports = {
    elements: {
      goLogo: '.go1up-logo',
      oneLogo: '.onepercenet-logo',
      emailOptionText: 'div#kc-social-providers h4',
      pageTitle: 'h1#kc-page-title',
      microsoftLogo: 'a#social-oidc i.fa-windows',
      username: '#username',
      password: '#password',
      forgotPasswordLink: 'a[tabindex="5"]',
      loginButton: '#kc-login',
      inputError: '#input-error',
      termsOfUseLink: 'a[href*="terms-of-use"]', 
      privacyPolicyLink: 'a[href*="privacy-policy"]',
      carouselButton1: 'ol.carousel-indicators > li[data-target="#myCarousel"]:nth-child(1)',
      carouselButton2: 'ol.carousel-indicators > li[data-target="#myCarousel"]:nth-child(2)',
    carouselImage: '.carousel-inner .item.active img',
      logoutLink: {
        selector: '//a[contains(text(), "Logout")]',
        locateStrategy: 'xpath',
      },
      carousel: '.carousel',
    },

    commands: [{

        clickMicrosoftLogo: function () {
            return this.click('@microsoftLogo');
          },

        loginWithCredentials(username, password) {
            return this
              .setValue('@username', username)
              .setValue('@password', password)
              .focusClick("css", "#kc-login", false)
          },

          checkRememberMeCheckbox(username, password) {
            return this
            .setValue('@username', username)
            .setValue('@password', password)
            .focusClick("css", ".checkmark", false)
          },

          checkForgotPasswordFunctionality(username) {
            return this.focusClick("css", "a[tabindex='5']", false)
            .setValue('@username', username)
            .focusClick("css", "input[type='submit']", false);
          },

          clickTermsOfUseLink() {
            return this.focusClick("css", "a[href*='terms-of-use']", false);
          },

          clickPrivacyPolicyLink() {
            return this.focusClick("css", "a[href*='privacy-policy']", false);
          },
          
    }],
  };
  