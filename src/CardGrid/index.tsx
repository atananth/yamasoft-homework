import Masonry from '@mui/lab/Masonry';
import type { Trips } from '../api/types';
import data from '../trips.json';
import { Container } from '@mui/material';
import { TripCard } from '../TripCard';

const trips: Trips = data;

export default function CardGrid() {
  return (
    <Container maxWidth={false}>
      <Masonry columns={{ xs: 1, sm: 3, md: 4 }} spacing={2}>
        {trips.map((trip) => (
            <TripCard {...trip}></TripCard>
        ))}
      </Masonry>
    </Container>
  )
}