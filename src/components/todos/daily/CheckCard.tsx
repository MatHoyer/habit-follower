import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

const CheckCard: React.FC<{ isDone: boolean; text: string }> = ({ isDone, text }) => {
  return (
    <div
      className={cn(
        'group cursor-default flex flex-col items-center justify-center rounded-lg border bg-background px-4 py-4 w-40',
        isDone ? 'hover:bg-green-500 hover:text-black' : 'hover:bg-red-500'
      )}
    >
      <div>
        {isDone ? (
          <Check className="text-green-500 group-hover:text-black" />
        ) : (
          <X className="text-red-500 group-hover:text-white" />
        )}
      </div>
      <div>{text}</div>
    </div>
  );
};

export default CheckCard;
