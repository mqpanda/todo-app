import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || "").replace(/^Bearer\s*/, '');

  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userData = decoded; //add user data 
    next(); // next middleware
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
