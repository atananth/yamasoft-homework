import { ErrorBoundary } from 'react-error-boundary';
import './assets/css/app.css'
import TripGrid from './TripGrid';

function App() {
  return (
    <>
      <div className='card-grid'>
          <ErrorBoundary onError={(error) => console.log(error)} fallback={<div data-cy='trip-grid-error' >Error related to trip grid, check console for error</div>}>
            <TripGrid data-cy='trip-grid' />
          </ErrorBoundary>      
      </div>
    </>
  )
}

export default App