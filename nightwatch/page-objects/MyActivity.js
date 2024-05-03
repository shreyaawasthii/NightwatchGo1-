module.exports = {
  elements: {
    myActivity: {
      selector: '//a[contains(text(), "My Activity")]',
      locateStrategy: 'xpath',
    },
    settings: {
      selector: '(//i[contains(text(), "settings")])[1]',
      locateStrategy: 'xpath',
    }, 
    profile: {
      selector: '//span[contains(text(), "Profile")]',
      locateStrategy: 'xpath',
    },
    logout: {
      selector: '//span[contains(text(), "Logout")]',
      locateStrategy: 'xpath',
    },
    pointsSection: '.w-15.points-section.d-flex.align-items-start.justify-content-end',
      feedPoints: '.feed-points',
    ScrollingPage: 'a[href*="/scoring-page"]',
    profileIcon: 'svg[width="118"][height="102"]',
    addContribute: ".btn.btn-primary.addRewardBtn.px-2.mt-n1",
  addContributionBtn: ".btn.btn-primary",
  advanceCertificate: {
    selector:
      "//table/tbody/tr[td[1][contains(text(), 'Advanced Certification')]]/td[2]",
    locateStrategy: "xpath",
  },
  myActivityVerify: ".card.tab-card.py-5.px-4",
  scoringBtn: ".nav-link.pe-0.text-white.font-weight-bolder",
  something: '[class="material-icons user-icon"]',
  timeLine: "div.timeline.w-100.mx-1",

  },
  commands: [{
      clickSettings: function () {
          return this.waitForElementVisible('@settings', 5000)
            .execute(function () {
              document.evaluate('(//i[contains(text(), "settings")])[1]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            });
        },
      
        clickProfile: function () {
          return this.waitForElementVisible('@profile')
            .execute(function () {
              document.evaluate('//span[contains(text(), "Profile")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
            });
          },

          clickLogout: function () {
              return this.waitForElementVisible('@logout')
                .execute(function () {
                  document.evaluate('//span[contains(text(), "Logout")]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                });
              },

          clickScrollingPage: function () {
              return this.waitForElementVisible('@ScrollingPage')
                .execute(function () {
                  document.evaluate('//a[@href= "/scoring-page"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                });
              },

          clickDashboard: function () {
              return this.waitForElementVisible('a[href*="/my-dashboard"]')
                .execute(function () {
                  document.evaluate('//a[@href= "/my-dashboard"]', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.click();
                });
              },

              clickProfileIcon: function () {
                return this.waitForElementVisible('@profileIcon')
                  .execute(function () {
                    document.querySelector('.material-symbols-outlined.hex').click();
                  });
              },
              
              
async isElementVisible(selector) {
  return new Promise((resolve) => {
    this.api.isVisible('xpath', selector, function (result) {
      resolve(result.value);
    });
  });
},

verifyPointsInSection(sectionIndex) {
  const pointsSectionXPath = `(//div[@class="w-15 points-section d-flex align-items-start justify-content-end"])`;
  const pointsSelector = `${pointsSectionXPath}[${sectionIndex}]//td`;

  return this.api.elements('xpath', pointsSelector, (result) => {
    if (result.value.length > 0) {
      result.value.forEach((element) => {
        this.api.elementIdText(element.ELEMENT, (textResult) => {
          const pointsText = textResult.value.trim();
          console.log(pointsText);
        });
      });
    } else {
      console.log(`Points section ${sectionIndex} does not contain any points`);
    }
  });
},
}],
};
