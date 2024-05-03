exports.assertion = function (selector, message) {
    this.message = message || 'Verifying carousel image change';
    this.expected = 'changed';
  
    this.pass = function (value) {
      return value === this.expected;
    };
  
    this.value = function (result) {
      return result;
    };
  
    this.command = function (callback) {
      const self = this;
  
      this.api.waitForElementPresent(selector, 5000, async function () {
        const currentImageSrc = await self.api.getAttribute(selector, 'src');
  
        if (self.previousImageSrc !== undefined) {
          self.api.verify.ok(currentImageSrc !== self.previousImageSrc, 'Verifying carousel image has changed');
        }
  
        self.previousImageSrc = currentImageSrc;
        callback.call(self, 'changed');
      });
  
      return this;
    };
  };