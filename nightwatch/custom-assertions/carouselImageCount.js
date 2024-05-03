exports.assertion = function (expectedCount, message) {
    this.message = message || `Expected ${expectedCount} carousel images.`;
    this.expected = expectedCount;
  
    this.pass = function (value) {
      return value === this.expected;
    };
  
    this.value = function (result) {
      return result.value.length;
    };
  
    this.command = function (callback) {
      const self = this;
  
      this.api.elements('css selector', '.carousel-inner .item', function (result) {
        callback(result);
        self.emit('complete');
      });
  
      return this;
    };
  };