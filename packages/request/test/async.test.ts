function fetchData(fn) {
  setTimeout(() => {
    fn(undefined, "leon");
  }, 10);
}

test("fetch data", (done) => {
  function callback(err, data) {
    if (err) {
      done(err);
      return;
    }
    // try {
      expect(data).toBe("43");
      done();
    // } catch (err) {
    //   done(err);
    // }
  }

  fetchData(callback);
});
