
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { User } from '@/contexts/AuthContext';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  
  // Fetch users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('bookbay_users') || '[]');
    const usersWithoutPasswords = storedUsers.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    setUsers(usersWithoutPasswords);
  }, []);
  
  const handleMessageUser = (userId: string) => {
    // In a real app, this would navigate to a chat or create a new conversation
    navigate(`/profile?tab=messages&userId=${userId}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p className="text-center text-muted-foreground">No users found</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-2 rounded hover:bg-accent/50"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">Member since {user.memberSince}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => handleMessageUser(user.id)}
                >
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Message
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UsersList;
