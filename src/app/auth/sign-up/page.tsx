'use client';
import signup from '@/actions/auth/signup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SignUp = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await signup(name, password);
      localStorage.setItem('auth', response.token);
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <Input type="text" onChange={(e) => setName(e.target.value)} placeholder="name" />
      <div className="flex items-center gap-3">
        <Input
          type={seePassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <Button variant={'ghost'} onClick={() => setSeePassword(!seePassword)}>
          {seePassword ? <EyeOffIcon /> : <EyeIcon />}
        </Button>
      </div>
      <Button disabled={isLoading} onClick={() => handleLogin()}>
        {isLoading ? <LoaderCircle className="animate-spin" /> : <div>Login</div>}
      </Button>
    </div>
  );
};

export default SignUp;
