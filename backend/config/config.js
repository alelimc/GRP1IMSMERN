import dotenv from 'dotenv'
const dotenvconfig = dotenv.config();

const config = {
	env: process.env.NODE_ENV || "development",
	port: process.env.PORT || 5000,
	jwtSecret: process.env.JWT_SECRET || "YOUR_secret",
	mongoUri: process.env.MONGODB_URI
};
export default config;
