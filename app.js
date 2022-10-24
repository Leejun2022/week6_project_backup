const express = require("express");

app.use("/", routes);

app.listen(port, () => {
  console.log(port, "포트로 서버가 열렸어요!");
});
