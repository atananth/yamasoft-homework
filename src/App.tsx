import './assets/css/app.css'
import { TripCard } from './TripCard'
import exampleTrips from './trips.json';

function App() {
  return (
    <>
      <div className='card-grid'>
        {exampleTrips.map((trip) => {
          return <TripCard {...trip} />;
        })}
        
      </div>
    </>
  )
}

export default App