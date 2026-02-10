import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { Controller, useForm, type FieldErrors } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import z from 'zod';

import { getListCompanies } from '@/api/get-list-companies';
import { signIn } from '@/api/sign-in';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const signInForm = z.object({
  companyCode: z.string({ error: 'Informe a empresa!' }),
  user: z.string().min(1, { error: 'Informe o usuário!' }),
  password: z.string().min(1, { error: 'Informe a senha!' }),
});

type SignInForm = z.infer<typeof signInForm>;

export function SignIn() {
  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>({
    resolver: zodResolver(signInForm),
  });

  const navigate = useNavigate();

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: getListCompanies,
  });

  const { mutateAsync: signInFn } = useMutation({
    mutationFn: signIn,
  });

  async function handleSignIn({ user, password, companyCode }: SignInForm) {
    try {
      await signInFn({
        userName: user,
        keypass: password,
        companyCode: companyCode,
      });

      navigate('/');
    } catch (error) {
      let description =
        'Ocorreu um erro inesperado. Por favor, tente novamente.';

      if (isAxiosError(error)) {
        description = error.response?.data.exceptionMessage;
      } else if (error instanceof Error) {
        description = error.message;
      }

      toast.error('Falha ao entrar', { description });
    }
  }

  function onError(errors: FieldErrors<SignInForm>) {
    const values = Object.values(errors);

    const description = values[0]?.message;

    toast.error('Erro no formulário', { description });
  }

  return (
    <>
      <div className="grid min-h-screen antialiased md:grid-cols-2 xl:grid-cols-3">
        <div className="border-foreground/5 bg-muted text-muted-foreground hidden flex-col justify-between border-r p-10 md:flex md:h-full xl:col-span-2">
          <div className="text-foreground flex w-full items-center justify-between text-lg">
            <span className="font-semibold">Plenus ERP</span>
            <ModeToggle />
          </div>

          <footer className="text-sm">
            &copy; Avant Softwares - {new Date().getFullYear()}
          </footer>
        </div>

        <div className="relative flex flex-col items-center justify-center">
          <div className="p-8">
            <div className="flex w-[350px] flex-col justify-center gap-6">
              <div className="flex flex-col gap-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Plenus ERP
                </h1>
                <p className="text-muted-foreground text-sm">
                  Faça login para acessar o Plenus.
                </p>
              </div>

              <form
                className="flex flex-col gap-y-4"
                onSubmit={handleSubmit(handleSignIn, onError)}
              >
                <div className="space-y-2">
                  <Label htmlFor="company">Empresa</Label>
                  <Controller
                    control={control}
                    name="companyCode"
                    render={({ field }) => {
                      return (
                        <Select
                          defaultValue="0"
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full" id="company">
                            <SelectValue placeholder="Informe a empresa" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {companies?.map((company, index) => {
                              return (
                                <SelectItem key={index} value={company.codigo}>
                                  {company.codigo} - {company.nome}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      );
                    }}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="text">Usuário</Label>
                  <Input id="text" type="text" {...register('user')} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register('password')}
                  />
                </div>

                <Button
                  disabled={isSubmitting}
                  className="w-full cursor-pointer"
                  type="submit"
                >
                  Entrar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
