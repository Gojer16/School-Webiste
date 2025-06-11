import { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, AlertCircle, Instagram } from 'lucide-react';

const InstagramFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstagramFeed = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get('/api/instagram/feed');
        setPosts(response.data.data || []);
      } catch (err) {
        setError('Failed to load Instagram feed. Please try again later.');
        console.error('Instagram feed error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px]">
        <Loader2 className="w-8 h-8 text-[#C02E28] animate-spin" />
        <p className="mt-4 text-gray-600">Loading Instagram feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-center">
        <AlertCircle className="w-8 h-8 text-[#C02E28]" />
        <p className="mt-4 text-gray-600">{error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 min-h-[300px] text-center">
        <Instagram className="w-8 h-8 text-[#C02E28]" />
        <p className="mt-4 text-gray-600">No Instagram posts available.</p>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-br from-[#150261]/5 via-white to-[#C02E28]/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#150261] to-[#1a0275] bg-clip-text text-transparent">
          Síguenos en Instagram
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative pb-[100%]">
                <img
                  src={post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url}
                  alt={post.caption || 'Instagram post'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              {post.caption && (
                <div className="p-4 bg-white">
                  <p className="text-gray-600 text-sm line-clamp-2">{post.caption}</p>
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstagramFeed;