import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(prev => liked ? prev - 1 : prev + 1);
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg mb-6 max-w-lg mx-auto">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-faith-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">U</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">@user_{post.user_id}</p>
            <p className="text-xs text-gray-500">2 hours ago</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
          </svg>
        </button>
      </div>

      {/* Post Image - Placeholder for now */}
      <div className="bg-gradient-to-br from-primary-100 to-faith-100 aspect-square flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl">✝</span>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            "{post.content || 'Trust in the Lord with all your heart and lean not on your own understanding.'}"
          </p>
          <p className="text-xs text-gray-500 mt-2">- Proverbs 3:5</p>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleLike}
              className={`${liked ? 'text-red-500' : 'text-gray-700'} hover:text-red-500 transition-colors`}
            >
              <svg className={`w-6 h-6 ${liked ? 'fill-current' : ''}`} fill={liked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            
            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            <button className="text-gray-700 hover:text-gray-900">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </button>
          </div>

          <button className="text-gray-700 hover:text-gray-900">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes Count */}
        <p className="text-sm font-semibold text-gray-900 mb-2">
          {likesCount} likes
        </p>

        {/* Post Content */}
        <div className="text-sm">
          <span className="font-semibold text-gray-900">@user_{post.user_id}</span>
          <span className="ml-2 text-gray-700">{post.content}</span>
        </div>

        {/* View Comments */}
        <button className="text-sm text-gray-500 mt-2 hover:text-gray-700">
          View all comments
        </button>

        {/* Add Comment */}
        <div className="flex items-center mt-3 pt-3 border-t border-gray-100">
          <input
            type="text"
            placeholder="Add a comment..."
            className="flex-1 text-sm bg-transparent border-0 focus:ring-0 p-0 placeholder-gray-500"
          />
          <button className="text-sm font-semibold text-primary-600 ml-2">Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;