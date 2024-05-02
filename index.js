const { PORT } = require("./helper/secret");
const dbConnection = require("./config/db"); 
const app = require("./app");

app.listen(PORT, async () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  await dbConnection();
});
