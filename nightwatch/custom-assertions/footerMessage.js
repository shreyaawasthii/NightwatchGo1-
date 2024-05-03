exports.assertion = function (selector, expectedMessage) {
    this.message = `Verifying footer message is "${expectedMessage}"`;
    this.expected = expectedMessage;
    this.pass = (value) => value.includes(this.expected);
    this.value = (result) => result.value.trim();
    this.command = function (callback) {
      const self = this;
  
      this.api.getText(selector, function (result) {
        if (typeof callback === 'function') {
          callback.call(self, result);
        }
      });
  
      return this; 
    };
  };