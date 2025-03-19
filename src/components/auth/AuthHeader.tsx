
import React from 'react';

const AuthHeader: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">Welcome to BookBay</h1>
      <p className="text-muted-foreground">Sign in to your account or create a new one</p>
    </div>
  );
};

export default AuthHeader;
