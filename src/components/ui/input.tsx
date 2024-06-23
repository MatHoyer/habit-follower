import * as React from 'react';

import { cn } from '@/lib/utils';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  Icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputProps>(({ Icon, className, type, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [capsLockActive, setCapsLockActive] = React.useState(false);

  const handleKeyPress: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const capsLockOn = event.getModifierState('CapsLock');
    setCapsLockActive(capsLockOn);
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const inputClasses = cn(
    'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
    Icon && 'pl-10',
    type === 'password' && (!capsLockActive ? 'pr-8' : 'pr-16'),
    className
  );

  return (
    <div className={cn('relative', className)}>
      {Icon && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Icon />
        </div>
      )}
      <input
        type={type === 'password' && showPassword ? 'text' : type}
        className={inputClasses}
        onKeyDown={handleKeyPress}
        ref={ref}
        {...props}
      />
      {type === 'password' && (
        <div className="absolute right-0 flex items-center pr-3 -translate-y-1/2 top-1/2 gap-x-1">
          {showPassword ? (
            <EyeOffIcon className="cursor-pointer" onClick={togglePasswordVisibility} size={20} />
          ) : (
            <EyeIcon className="cursor-pointer" onClick={togglePasswordVisibility} size={20} />
          )}
        </div>
      )}
    </div>
  );
});
export { Input, InputWithIcon };
