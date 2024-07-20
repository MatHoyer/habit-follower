import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { TAddTodoForm } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { SafeActionFn } from 'next-safe-action';
import { useAction } from 'next-safe-action/hooks';
import React from 'react';
import { useForm } from 'react-hook-form';
import { ZodObject, ZodString, ZodTypeAny } from 'zod';

type props = {
  action: SafeActionFn<
    string,
    ZodObject<
      {
        name: ZodString;
      },
      'strip',
      ZodTypeAny,
      {
        name: string;
      },
      {
        name: string;
      }
    >,
    readonly [],
    {
      [x: string]: string[] | undefined;
      [x: number]: string[] | undefined;
      [x: symbol]: string[] | undefined;
    },
    readonly [],
    void
  >;
  schema: ZodObject<
    {
      name: ZodString;
    },
    'strip',
    ZodTypeAny,
    {
      name: string;
    },
    {
      name: string;
    }
  >;
};

const AddForm: React.FC<props> = ({ action, schema }) => {
  const { execute: add, result: addResult } = useAction(action);

  const form = useForm<TAddTodoForm>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
    },
    mode: 'onChange',
  });

  return (
    <div className="sticky top-16 h-fit rounded-lg border bg-background px-4 py-4 md:w-[260px] flex flex-col gap-3">
      {addResult.serverError && <div className="text-red-600">{addResult.serverError}</div>}
      <Form {...form} state={addResult}>
        <form
          onSubmit={form.handleSubmit((data) => {
            add(data);
            form.reset();
          })}
        >
          <div className="flex flex-col gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <FormControl>
                    <Input placeholder="new todo name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Add todo</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddForm;
