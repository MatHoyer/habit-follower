'use client';
import login from '@/actions/auth/login';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { EyeIcon, EyeOffIcon, LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await login(name, password);
      localStorage.setItem('auth', response.token);
      setIsLoading(false);
      router.push('/');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
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

export default Login;
