let Login = browser.page.Login();
let MyActivity = browser.page.MyActivity();

describe('Dashboard Verification', () => {
    before((browser) => {
        browser
        .window.maximize()
        .url('https://nashtechglobal.qa.go1percent.com/')

});

after(async (browser) => {
  browser.end();
});

it('Verify successful login with valid credentials', function (browser) {
  Login
    .loginWithCredentials('temp_test_user', '8ZgC8^?c6m')
  MyActivity.assert.visible('@settings')
});

it('Verify user should be able to see the all the activities on the My activity ', function (browser) {
  browser
      .focusClick("xpath","(//i[contains(text(), 'settings')])[1]")
      .focusClick("css",".d-flex.py-1.mt-1")
   MyActivity.waitForElementVisible('@myActivity', 50000);
});

it('Verify appropriate points for contributions', function (browser) {
  const contributionsTable = [];

  MyActivity
    .clickScrollingPage()
    .waitForElementVisible('tbody', 100000, 'Expected to find tbody on scoring page')
    .execute(function () {
      const tableRows = document.evaluate('//tbody/tr', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      const tableData = [];

      for (let i = 0; i < tableRows.snapshotLength; i++) {
        const rowElement = tableRows.snapshotItem(i);
        const rowData = [];
        
        const tableCells = document.evaluate('td', rowElement, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

        for (let j = 0; j < tableCells.snapshotLength; j++) {
          const tdElement = tableCells.snapshotItem(j);
          rowData.push(tdElement.textContent.trim());
        }

        tableData.push(rowData);
      }

      return tableData;
    }, [], function (result) {
      if (result.status === 0) {
        contributionsTable.push(...result.value);
        console.log('Contributions Table:', contributionsTable);
      } else {
        console.error('Error executing script:', result);
      }
    });

  MyActivity.clickDashboard().clickProfileIcon();

  browser
    .execute(function () {
      const contributionsTableInBrowser = [];

      for (let i = 1; i <= 10; i++) {
        const contributionSelector = `(//span[@class="text-decoration-underline font-weight-bold contribution-title"])[${i}]`;
        const pointsSectionSelector = contributionSelector + '/following::div[1]';

        const contributionElement = document.evaluate(contributionSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        if (contributionElement) {
          const contributionText = contributionElement.textContent.trim();
          console.log(contributionText);

          if (contributionsTableInBrowser.flat().includes(contributionText)) {
            const pointsTextElement = document.evaluate(pointsSectionSelector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            
            if (pointsTextElement) {
              const pointsText = pointsTextElement.textContent.trim();
              console.log(pointsText);

              if (pointsText.includes('pts')) {
                console.log(`Match found! Contribution: ${contributionText}, Points: ${pointsText}`);
              } else {
                console.log(`Contribution ${contributionText} has no points`);
              }
            } else {
              console.log(`Points element not found for selector: ${pointsSectionSelector}`);
            }
          } else {
            console.log(`Contribution ${contributionText} not found in scoring page`);
          }
        } else {
          console.log(`Contribution element not found for selector: ${contributionSelector}`);
        }
      }

      return contributionsTableInBrowser;
    }, [], function (result) {
      // Handle the result or errors if needed
      if (result.status !== 0) {
        console.error('Error executing script:', result);
      }
    });
});

it("Verify that the user can able to see the time the activity was done on all Activity-", function () {
  MyActivity
    .waitForElementVisible("@timeLine")
    .assert.elementPresent(
      "@timeLine",
      "Time line is visible for every activity",
    );
});

});





