module.exports = {
  keys: "abc",
  onerror: {
    json(err, ctx) {
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
  },
};