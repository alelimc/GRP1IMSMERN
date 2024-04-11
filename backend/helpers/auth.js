import jwt from 'jsonwebtoken';
import config from '../config/config.js'

const getTokenUserId = (token) => {
    try {
      const decoded = jwt.verify(token, config.jwtSecret);
      return decoded.userId; // Assuming the user ID is stored in the token's payload under the key '_id'
    } catch (error) {
      // Handle invalid token or other errors
      return null;
    }
  }
  
  export default { getTokenUserId }