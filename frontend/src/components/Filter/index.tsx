import React from 'react';
import { Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger } from '../../components/ui/select';
import { Input } from '../../components/ui/input';

interface FilterComponentProps {
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
  handleFilter: (value: string) => void;
  handleDateChange: () => void;
}

export const FilterComponent: React.FC<FilterComponentProps> = ({ startDate, endDate, setStartDate, setEndDate, handleFilter, handleDateChange }) => {
  return (
    <>
      <Input type='date'
        value={startDate}
        className='w-auto'
        onChange={e => setStartDate(e.target.value)}
        onBlur={handleDateChange}
      />

      <Input type='date'
        value={endDate}
        className='w-auto'
        onChange={e => setEndDate(e.target.value)}
        onBlur={handleDateChange}
      />

      <div className='relative'>
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
    </>
  );
};