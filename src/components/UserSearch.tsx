
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { User } from '@/contexts/AuthContext';

interface UserSearchProps {
  onSelectUser?: (user: User) => void;
  className?: string;
}

const UserSearch = ({ onSelectUser, className = '' }: UserSearchProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  
  // Fetch users from localStorage
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('bookbay_users') || '[]');
    const usersWithoutPasswords = storedUsers.map((user: any) => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    setUsers(usersWithoutPasswords);
  }, []);
  
  const filteredUsers = query === '' 
    ? users 
    : users.filter((user) => 
        user.name.toLowerCase().includes(query.toLowerCase()) || 
        user.email.toLowerCase().includes(query.toLowerCase())
      );
      
  const handleSelect = (user: User) => {
    if (onSelectUser) {
      onSelectUser(user);
    }
    setIsOpen(false);
    setQuery('');
  };
  
  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center">
        <Input
          type="text"
          placeholder="Search users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-8 h-7 w-7"
            onClick={() => setQuery('')}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button 
          type="button" 
          variant="ghost" 
          size="icon"
          className="ml-1"
        >
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-md">
          <Command>
            <CommandList>
              <CommandInput placeholder="Search users..." value={query} onValueChange={setQuery} />
              {filteredUsers.length === 0 ? (
                <CommandEmpty>No users found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {filteredUsers.map((user) => (
                    <CommandItem
                      key={user.id}
                      value={user.name}
                      onSelect={() => handleSelect(user)}
                      className="cursor-pointer"
                    >
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary mr-2">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
