const axios = require('axios');
require('dotenv').config();

const INSTAGRAM_API_URL = 'https://graph.instagram.com';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

const getInstagramFeed = async (req, res) => {
  try {
    if (!INSTAGRAM_ACCESS_TOKEN) {
      throw new Error('Instagram access token not configured');
    }

    const response = await axios.get(`${INSTAGRAM_API_URL}/me/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
        access_token: INSTAGRAM_ACCESS_TOKEN,
        limit: 9
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Instagram API Error:', error);
    res.status(500).json({
      error: 'Failed to fetch Instagram feed',
      message: error.message
    });
  }
};

const refreshAccessToken = async (req, res) => {
  try {
    if (!INSTAGRAM_ACCESS_TOKEN) {
      throw new Error('Instagram access token not configured');
    }

    const response = await axios.get(`${INSTAGRAM_API_URL}/refresh_access_token`, {
      params: {
        grant_type: 'ig_refresh_token',
        access_token: INSTAGRAM_ACCESS_TOKEN
      }
    });

    // In a production environment, you might want to store the new token
    res.json(response.data);
  } catch (error) {
    console.error('Token Refresh Error:', error);
    res.status(500).json({
      error: 'Failed to refresh access token',
      message: error.message
    });
  }
};

module.exports = {
  getInstagramFeed,
  refreshAccessToken
};