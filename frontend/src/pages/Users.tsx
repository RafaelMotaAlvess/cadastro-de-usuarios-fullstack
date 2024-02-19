import React, { useEffect, useState } from 'react';
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Filter, Search } from "lucide-react"
import { Modal } from '../components/Modal'
import { TableContent } from '../components/Table'
import { useQuery, useMutation } from 'react-query'
import axios from 'axios'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

interface FilterPeriodMutationProps {
  startDate: string;
  endDate: string;
}

export interface UserDataResponse {
  users: User[];
}

export function Users() {
  const [searchName, setSearchName] = useState('');
  const [usersToShow, setUsersToShow] = useState<User[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data: allUsers, refetch } = useQuery<UserDataResponse>('users', async () => {
    const response = await axios.get('http://localhost:3000/users')
    return response.data
  }, {
    staleTime: 1000 * 60, // 1 minute
  })

  useEffect(() => {
    if (allUsers) {
      setUsersToShow(allUsers.users);
    }
  }, [allUsers]);

  const searchUserMutation = useMutation(async (name: string) => {
    const response = await axios.get(`http://localhost:3000/users/name/${name}`)
    return response.data
  }, {
    onSuccess: data => {
      setUsersToShow(data.users);
    }
  })

  const filterDescMutation = useMutation(async () => {
    const response = await axios.get('http://localhost:3000/users/desc')
    return response.data
  }, {
    onSuccess: data => {
      setUsersToShow(data.users);
    }
  })

  const filterAscMutation = useMutation(async () => {
    const response = await axios.get('http://localhost:3000/users/asc')
    return response.data
  }, {
    onSuccess: data => {
      setUsersToShow(data.users);
    }
  })

  const filterDateMutation = useMutation(async (date: string) => {
    const response = await axios.get(`http://localhost:3000/users/${date}`)
    return response.data
  }, {
    onSuccess: data => {
      setUsersToShow(data.users);
    }
  })

  const filterPeriodMutation = useMutation(async ({ startDate, endDate }: FilterPeriodMutationProps) => {
    const response = await axios.get(`http://localhost:3000/users/period?startDate=${startDate}&endDate=${endDate}`)
    return response.data
  }, {
    onSuccess: data => {
      setUsersToShow(data.users);
    }
  })

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchUserMutation.mutate(searchName);
  }

  const handleFilter = (value: string) => {
    if (value === 'desc') {
      filterDescMutation.mutate();
    } else if (value === 'asc') {
      filterAscMutation.mutate();
    }
  }

  const handleDateChange = () => {
    if (startDate && endDate) {
      filterPeriodMutation.mutate({ startDate, endDate });
    } else if (startDate) {
      filterDateMutation.mutate(startDate);
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-4">
      <h1 className='text-3xl font-bold'>Usuarios</h1>

      <div className="flex flex-wrap items-center justify-center sm:justify-between space-y-2 sm:space-y-0">
        <form className='flex flex-wrap items-center gap-2 w-full sm:w-auto' onSubmit={handleSearch}>
          <Input name="id" placeholder='Nome do usuario' className='w-full sm:w-auto' onChange={e => setSearchName(e.target.value)} />

          <Input type='date'
            value={startDate}
            className='w-full sm:w-auto'
            onChange={e => setStartDate(e.target.value)}
            onBlur={handleDateChange}
          />

          <Input type='date'
            value={endDate}
            className='w-full sm:w-auto'
            onChange={e => setEndDate(e.target.value)}
            onBlur={handleDateChange}
          />

          <div className='flex flex-wrap items-center gap-2 w-full sm:w-auto'>
            <div className='relative w-full sm:w-auto'>
              <Select onValueChange={handleFilter}>
                <SelectTrigger>
                  <Filter className='w-4 h-4 mr-2' />
                  Filtrar
                </SelectTrigger>
                <SelectContent className=''>
                  <SelectItem value="desc" className=' cursor-pointer' >DECRESCENTE</SelectItem>
                  <SelectItem value="asc" className=' cursor-pointer'>CRESCENTE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type='submit' variant={'outline'} className='w-full sm:w-auto'>
              <Search className='w-4 h-4 mr-2' />
              Pesquisar resultados
            </Button>
          </div>
        </form>
        <Modal refetchUsers={refetch} />

      </div>
      <TableContent users={usersToShow ?? []} refetchUsers={refetch} />
    </div>
  )
}