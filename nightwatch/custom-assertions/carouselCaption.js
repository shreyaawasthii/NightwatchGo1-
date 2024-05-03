exports.assertion = function (selector, expectedCaption) {
    this.message = `Verifying carousel caption includes "${expectedCaption}"`;
    this.expected = expectedCaption;
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