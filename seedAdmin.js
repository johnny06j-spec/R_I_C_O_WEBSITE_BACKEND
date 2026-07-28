import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

dotenv.config()

// Support either MONGO_URI or MONGODB_URI from .env
const MONGODB_URI = process.env.MONGO_URI || process.env.MONGODB_URI

if (!MONGODB_URI) {
  console.error('❌ Neither MONGO_URI nor MONGODB_URI is defined in your .env file!')
  process.exit(1)
}

// User Schema matching your admin model structure
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('⚡ Connected to MongoDB Atlas...')

    const adminUsername = 'admin'
    const rawPassword = 'RicoAdmin2026!'

    // Hash password
    const hashedPassword = await bcrypt.hash(rawPassword, 10)

    // Upsert admin user (updates if exists, creates if missing)
    await User.findOneAndUpdate(
      { username: adminUsername },
      { username: adminUsername, password: hashedPassword },
      { upsert: true, new: true }
    )

    console.log('✅ Admin user successfully created/updated in Atlas!')
    console.log('Username: admin')
    console.log('Password: RicoAdmin2026!')
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message)
  } finally {
    await mongoose.disconnect()
    process.exit(0)
  }
}

seed()