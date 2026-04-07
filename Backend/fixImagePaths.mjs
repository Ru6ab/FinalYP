// fixImagePaths.mjs
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Listing from './models/listing.model.js';

dotenv.config(); // load .env variables

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/yourdbname';

try {
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log('✅ Connected to MongoDB');

  const listings = await Listing.find();

  for (const listing of listings) {
    let updated = false;

    const newImgUrls = listing.imgUrls.map(url => {
      if (url.includes('\\uploads\\') || url.includes('C:\\')) {
        updated = true;
        const filename = url.split('\\').pop(); // for Windows-style path
        return `uploads/${filename}`;
      }
      return url;
    });

    if (updated) {
      listing.imgUrls = newImgUrls;
      await listing.save();
      console.log(`✅ Fixed listing ${listing._id}`);
    }
  }

  console.log('🎉 All listings processed');
  process.exit();
} catch (error) {
  console.error('❌ Error:', error);
  process.exit(1);
}
