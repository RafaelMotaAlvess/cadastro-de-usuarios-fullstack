import axios from "axios";
import { UserDataResponse } from "../../pages/Users"
import { TableHeader, TableHead, TableBody, TableRow, TableCell, Table } from "../ui/table"
import { Trash } from "lucide-react";
import { UpdateModal } from "../Modal/update";

interface TableContentProps extends UserDataResponse {
  refetchUsers: () => void;
}

export function TableContent({ users, refetchUsers }: TableContentProps) {
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/users/${id}/delete`);
      refetchUsers();
    } catch (error) {
      console.error('Erro ao deletar usuário', error);
    }
  }

  return (
    <div className="border rounded-lg p-2">
      <Table >
        <TableHeader>
          <TableHead>ID</TableHead>
          <TableHead>NOME</TableHead>
          <TableHead>EMAIL</TableHead>
          <TableHead>TELEFONE</TableHead>
          <TableHead>CRIAÇÃO</TableHead>
          <TableHead>AÇÕES</TableHead>
        </TableHeader>

        <TableBody>
          {users?.map(item => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{new Date(item.createdAt).toISOString().split('T')[0]}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <UpdateModal user={item} refetchUsers={refetchUsers} />
                    <Trash className="w-4 h-4 cursor-pointer" onClick={() => handleDelete(item.id)} />
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}