require('dotenv').config();
const mongoose = require('mongoose');

(async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  const app = require('./app');
  const port = Number(process.env.PORT || 4000);
  app.listen(port, () => console.log(`API on :${port}`));
})().catch((e) => { console.error(e); process.exit(1); });
