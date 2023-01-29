import dotenv from 'dotenv';

import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import path from 'path';
import productsRoutes from './routes/products';

dotenv.config();

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'images');
//   },
//   filename: (req, file, cb) => {
//     const date = new Date().toISOString();
//     const fileName = date.replace(/:/g, '-') + '-';
//     cb(null, fileName + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === 'image/png' ||
//     file.mimetype === 'image/jpg' ||
//     file.mimetype === 'image/jpeg'
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// app.use(bodyParser.urlencoded()); // x-www-form-urlencoded <form>
app.use(bodyParser.json()); // application/json
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
// );
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(express.static('public'));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

app.use(productsRoutes);

mongoose
  .connect(process.env.MONGODB_CONNECT_URI as string)
  .then(() => {
    app.listen(process.env.PORT || 3000);
  })
  .catch((err: Error) => {
    console.log(err);
  });
