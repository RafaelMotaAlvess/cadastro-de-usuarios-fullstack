import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { User } from "../../pages/Users";
import { Edit2 } from "lucide-react";
import { toast } from "react-toastify";

interface UpdateModalProps {
  user: User;
  refetchUsers: () => void;
}

interface ApiError {
  response?: {
    data: {
      message: string;
    }
  }
}

export function UpdateModal({ user, refetchUsers }: UpdateModalProps) {
  const [formData, setFormData] = useState<User>({
    id: user.id,
    name: '',
    email: '',
    phone: '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setFormData({
        id: user.id,
        name: '',
        email: '',
        phone: '',
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt
      });
    }
  }, [isOpen, user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3000/users/${user.id}/update`, formData);
      refetchUsers();
      setIsOpen(false);
      toast.success('Dados enviados com sucesso');
    } catch (error) {
      console.error('Erro ao atualizar usuário', error);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Edit2 className="w-4 h-4 cursor-pointer" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar Usuario</DialogTitle>
          <DialogDescription>Atualize os detalhes do usuário</DialogDescription>

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
              <div className="space-x-4">
                <DialogClose asChild>
                  <Button type="button" variant={'destructive'}>Cancelar</Button>
                </DialogClose>
                <Button type="submit">Salvar</Button>
              </div>
            </DialogFooter>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}