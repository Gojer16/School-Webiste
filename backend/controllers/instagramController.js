const axios = require('axios');
const { ValidationError, AuthError } = require('../errors');
const rateLimit = require('express-rate-limit');

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

// Rate limiting for Instagram API calls
const instagramLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50,
  message: 'Too many requests, please try again later'
});

const validateInstagramToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new AuthError('Invalid Instagram token configuration');
  }
};

const getInstagramFeed = async (req, res) => {
  try {
    validateInstagramToken(INSTAGRAM_ACCESS_TOKEN);
    
    const response = await axios.get(`${INSTAGRAM_API_URL}/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
        access_token: INSTAGRAM_ACCESS_TOKEN,
        limit: 9
      },
      timeout: 5000
    });

    res.json({
      success: true,
      data: response.data.data.map(post => ({
        id: post.id,
        type: post.media_type,
        url: post.media_url,
        permalink: post.permalink,
        timestamp: post.timestamp
      }))
    });
  } catch (error) {
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      success: false,
      message: 'Failed to fetch Instagram feed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    validateInstagramToken(INSTAGRAM_ACCESS_TOKEN);
    
    const response = await axios.get(`${INSTAGRAM_API_URL}/refresh_access_token`, {
      params: {
        grant_type: 'ig_refresh_token',
        access_token: INSTAGRAM_ACCESS_TOKEN
      },
      timeout: 5000
    });

    res.json({
      success: true,
      expiresIn: response.data.expires_in
    });
  } catch (error) {
    const statusCode = error.response?.status || 500;
    res.status(statusCode).json({
      success: false,
      message: 'Token refresh failed',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

module.exports = {
  getInstagramFeed: [instagramLimiter, getInstagramFeed],
  refreshAccessToken: [instagramLimiter, refreshAccessToken]
};