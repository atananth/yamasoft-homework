import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Masonry from '@mui/lab/Masonry';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Paper from '@mui/material/Paper';
import type { Trips } from '../api/types';
import data from '../trips.json';
import { Box, Container } from '@mui/material';
import { Image } from 'mui-image';

const cards: Trips = data;

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: 'center',
  color: (theme.vars || theme).palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  backgroundColor: '#fff',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

// TODO: Extract the card component and it's props generically
export default function CardGrid() {

  console.log(cards)

  return (
    <Container maxWidth={false}>
      <Masonry columns={3} spacing={2}>
        {cards.map((item, index) => (
          <Paper key={index}>
            <Box>
              <Image
                showLoading src={`${item.image}?q=50`} // quality here is set to 50
                alt='404 Image Not Found'
              />
            </Box>
            <Label>{item.name}</Label>
            <StyledAccordion disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                {item.description}
              </AccordionSummary>
              <AccordionDetails>{item.long_description}</AccordionDetails>
            </StyledAccordion>
          </Paper>
        ))}
      </Masonry>
    </Container>
  )
}