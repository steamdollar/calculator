const qs = require("qs");

const body = qs.stringify({
  grant_type: "authoriziation_code",
  client_id: "aaaaa",
  client_secret: "bbbb",
  redirect_uri: "cccc",
  code: "dddd",
});

console.log(body);
