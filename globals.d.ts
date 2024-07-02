import { Day, Todo } from '@prisma/client';

declare global {
  type TTodo = Todo & { days: Day[] };
  type TData<T> = T | { message: string };

  type TFormState<T = unknown> = {
    data?: TData<T>;
    serverError?: string;
    fetchError?: string;
    validationErrors?: Record<string, string[] | undefined> | undefined;
  };

  interface IModal {
    error: (params: IMessageParams) => Promise<boolean>;
    info: (params: IMessageParams) => Promise<boolean>;
    question: (params: IQuestionParams) => Promise<boolean>;
  }

  interface IMessageParams {
    title?: string;
    message?: string;
  }

  interface IQuestionParams extends IMessageParams {
    doubleConfirm?: boolean;
  }

  interface IQuestionModalProps extends IQuestionParams {
    closeModal: (answer: boolean) => void;
    open?: boolean;
  }

  type TMessageType = 'error' | 'warning' | 'info';

  interface IMessageModalProps extends IMessageParams {
    closeModal: () => void;
    open?: boolean;
    messageType: TMessageType;
  }
}
