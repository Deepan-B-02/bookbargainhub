
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const SignUpForm = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  
  // Form states
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName || !signupEmail || !signupPassword || !signupConfirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    
    if (signupPassword !== signupConfirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }
    
    const { error } = await signUp(signupEmail, signupPassword, signupName);
    
    if (!error) {
      navigate('/profile');
    }
  };
  
  return (
    <form onSubmit={handleSignUp} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="signup-name">Full Name</Label>
        <Input 
          id="signup-name" 
          placeholder="John Doe" 
          value={signupName}
          onChange={(e) => setSignupName(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-email">Email</Label>
        <Input 
          id="signup-email" 
          type="email" 
          placeholder="name@example.com" 
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-password">Password</Label>
        <Input 
          id="signup-password" 
          type="password" 
          placeholder="••••••••"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="signup-confirm-password">Confirm Password</Label>
        <Input 
          id="signup-confirm-password" 
          type="password" 
          placeholder="••••••••"
          value={signupConfirmPassword}
          onChange={(e) => setSignupConfirmPassword(e.target.value)}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          I agree to the{" "}
          <a href="/terms" className="text-primary hover:underline">
            terms of service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="text-primary hover:underline">
            privacy policy
          </a>
        </label>
      </div>
      
      <Button type="submit" className="w-full">
        Create Account
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

export default SignUpForm;
