
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const SignInForm = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  
  // Form states
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassword, setSigninPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signinEmail || !signinPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    const { error } = await signIn(signinEmail, signinPassword);
    
    if (!error) {
      navigate('/profile');
    }
  };
  
  return (
    <form onSubmit={handleSignIn} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signin-email">Email</Label>
        <Input 
          id="signin-email" 
          type="email" 
          placeholder="name@example.com" 
          value={signinEmail}
          onChange={(e) => setSigninEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="signin-password">Password</Label>
          <Button variant="link" className="p-0 h-auto text-xs">
            Forgot password?
          </Button>
        </div>
        <Input 
          id="signin-password" 
          type="password" 
          placeholder="••••••••"
          value={signinPassword}
          onChange={(e) => setSigninPassword(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
        />
        <label
          htmlFor="remember-me"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </label>
      </div>
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline" type="button">
          Google
        </Button>
        <Button variant="outline" type="button">
          Facebook
        </Button>
      </div>
    </form>
  );
};

export default SignInForm;
