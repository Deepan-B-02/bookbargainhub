
import React from 'react';

const FallbackLoading: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      <span className="ml-3 text-lg">Loading BookBay...</span>
    </div>
  );
};

export default FallbackLoading;
