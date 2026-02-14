import Masonry from '@mui/lab/Masonry';
import type { Trips } from '../api/types';
import data from '../trips.json';
import { Autocomplete, Box, Button, Container, TextField } from '@mui/material';
import { TripCard } from '../TripCard';
import { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';

export default function TripGrid() {
  const [search, setSearch] = useState<string>('')
  const handleSearch = (text: string) => setSearch(text)
  const [sort, setSort] = useState<boolean | null>(null)
  const ascending = data.toSorted((t1, t2) => t1.rating - t2.rating)
  const descending = ascending.toReversed()

  const trips: Trips = useMemo(() => {
    let result = data
    result = sort === null ? result : sort ? ascending : descending
    result = search === '' ? result : result.filter(trip => trip.name.toLowerCase().includes(search.toLowerCase()))
    return result;
  }, [sort, search])

  return (
    <Container maxWidth={false}>
      <Box display='flex' paddingBottom='30px'>
        <IconButton onClick={(_e) => { setSort(sort === null ? true : sort ? false : null) }}>{
        sort === null ? <SortIcon/> : 
        sort ? <ArrowUpwardIcon/> : 
        <ArrowDownwardIcon/> }</IconButton>
        <Autocomplete
          disablePortal
          options={data.map((trip) => trip.name)}
          sx={{ width: 300}}
          value={search}
          onInputChange={(_e, text) => { handleSearch(text)}}
          renderInput={(params) => <TextField {...params} label="Search Trips" />}
        />
      </Box>
      <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
        {trips.map((trip) => <TripCard {...trip} />)}
      </Masonry>
    </Container>
  )
}