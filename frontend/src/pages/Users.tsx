import React, { useState } from 'react';
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Filter, Search } from "lucide-react"
import { Modal } from '../components/Modal'
import { TableContent } from '../components/Table'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export interface UserDataResponse {
  users: User[];
}

export function Users() {
  const [searchName, setSearchName] = useState('');


  const { data: allUsers, refetch } = useQuery<UserDataResponse>('users', async () => {
    const response = await axios.get('http://localhost:3000/users')
    return response.data
  }, {
    staleTime: 1000 * 60, // 1 minute
  })

  const searchUserMutation = useMutation(async (name: string) => {
    const response = await axios.get(`http://localhost:3000/users/name/${name}`)
    return response.data
  })

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchUserMutation.mutate(searchName);
  }

  const usersToShow = searchUserMutation.isSuccess ? searchUserMutation.data.users : allUsers?.users;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className='text-3xl font-bold'>Usuarios</h1>

      <div className="flex items-center justify-between">
        <form className='flex items-center gap-2' onSubmit={handleSearch}>
          <Input name="id" placeholder='Nome do usuario' className='w-auto' onChange={e => setSearchName(e.target.value)} />
          <Button type='submit' variant={'outline'}>
            <Search className='w-4 h-4 mr-2' />
            Pesquisar resultados
          </Button>
        </form>
        <Modal refetchUsers={refetch} />

      </div>
      <TableContent users={usersToShow ?? []} refetchUsers={refetch} />
    </div>
  )
}