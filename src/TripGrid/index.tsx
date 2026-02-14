import Masonry from '@mui/lab/Masonry';
import type { Trips } from '../api/types';
import { Autocomplete, Box, CircularProgress, Container, TextField } from '@mui/material';
import { TripCard } from '../TripCard';
import { useMemo, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortIcon from '@mui/icons-material/Sort';
// Uncomment to run locally
import data from '../../cypress/fixtures/trips.json';
// Comment these two to run locally
// import { useEffect } from 'react';
// import { useErrorBoundary } from 'react-error-boundary';


export default function TripGrid() {
  const [loading] = useState<boolean>(false);
  //const [data, setData] = useState<Trips>([]);
  // const { showBoundary } = useErrorBoundary();
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('https://yamasoft.bg/trips.json');
  //       if (!response.ok) {
  //         // The Error object here could be more specific, like a HTTP404Error or something, depends on what the fetching library provides
  //         throw new Error('Trips fetch response was not 200');
  //       }
  //       const data = await response.json();
  //       setData(data);
  //       setLoading(false);
  //     } catch (err) {
  //       if (err instanceof Error) {
  //         console.log(err.message)
  //         showBoundary(err) // throw it upwards to the error boundary
  //       }
  //       else {
  //         console.log("Unknown Error: " + err)
  //         showBoundary(err) // throw it upwards to the error boundary
  //       }
  //     }
  //   }
  //   fetchData();
  // }, []);


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
    <>
      {loading ? 
      (<CircularProgress />) : (
      <Container data-cy='trip-grid' maxWidth={false}>
        <Box display='flex' paddingBottom='30px'>
          <IconButton data-cy='trip-grid-sort-button' onClick={(_e) => { setSort(sort === null ? true : sort ? false : null) }}>{
          sort === null ? <SortIcon/> : 
          sort ? <ArrowUpwardIcon/> : 
          <ArrowDownwardIcon/> }</IconButton>
          <Autocomplete
            data-cy='trip-grid-search-field'
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
      )}
    </>
  )
}