import { Paper, CardActionArea, Box, AccordionSummary, AccordionDetails, Accordion, styled, Modal } from '@mui/material'
import type { Trip } from '../api/types.ts'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Image } from 'mui-image';
import React from 'react';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: '#F0F0F0',
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
  backgroundColor: '#F0F0F0',
  color: (theme.vars || theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export const TripCard = ({ id, image, name, rating, description, long_description }: Trip) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  
  return (
    <Paper data-cy={`trip-card-${id}`} key={id}>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby={`image-modal-${id}`}
      >
        <Box display='flex' justifyContent='center' id={`image-modal-${id}`} onClick={handleModalClose}>
          <img
            style={{maxHeight: '100vh'}}
            src={`${image}?q=50&lossless=true&jpeg-progressive=true`} // quality here is set to 50
            alt='404 Image Not Found'
          />
        </Box>
      </Modal>
      <CardActionArea onClick={handleModalOpen}>
        <Box>
          <Image
            showLoading
            duration={350}
            src={`${image}?q=50&lossless=true&jpeg-progressive=true`} // quality here is set to 50
            alt='404 Image Not Found'
          />
        </Box>
        {/* Since the rating is an int and not a float I prefer to use a simple repeat over a UI library component */}
        <Label> {name} &nbsp; <span className='rating'>{'★'.repeat(rating)}</span> </Label>
        </CardActionArea>
        <StyledAccordion disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            {description}
          </AccordionSummary>
          <AccordionDetails>{long_description}</AccordionDetails>
        </StyledAccordion>
    </Paper>
  )
}