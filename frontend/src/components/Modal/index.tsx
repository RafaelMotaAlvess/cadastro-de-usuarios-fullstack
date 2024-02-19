import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChangeEvent, useState } from "react";
import axios, { AxiosError } from "axios";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface ModalProps {
  refetchUsers: () => void;
}

interface ApiError {
  response?: {
    data: {
      message: string;
    }
  }
}

export function Modal({ refetchUsers }: ModalProps) {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    phone: ''
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/users', formData)
      setFormData({
        name: '',
        email: '',
        phone: ''
      });

      console.log('Dados enviados com sucesso', response.data)
      refetchUsers();
      setIsOpen(false)

      toast.success('Dados enviados com sucesso');
    } catch (error) {
      console.error('Erro ao enviar dados para o formulario', error);
      toast.error(`Erro ao enviar dados para o formulario: ${(error as AxiosError & ApiError).response?.data.message}`);
    }
  }

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.slice(0, 11);

    return formatted.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({ ...formData, phone: formatPhoneNumber(value) });
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className='w-4 h-4 mr-2' />
            Novo usuário
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Usuario</DialogTitle>
            <DialogDescription>Adicione um novo usuario ao sistema</DialogDescription>

            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='name'>Nome</Label>
                <Input
                  className='col-span-3'
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  className='col-span-3'
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className='grid grid-cols-4 items-center text-right gap-3'>
                <Label htmlFor='telefone'>Telefone</Label>
                <Input
                  className='col-span-3'
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <DialogFooter>
                <DialogClose>
                  <Button type="button" variant={'destructive'}>Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </div>
  )
}