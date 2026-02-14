import type { Trip } from '../api/types.ts'
import '../assets/css/grid.css'

export const TripCard = ({ id, image, name, rating, description, long_description }: Trip) => {
  return (
    <>
        <div className={`item-${id}`}>
          <div className="card">
            <img className='card-image' src={image} alt='404 Image not found'/>
            <article>
              <h1>{name}</h1>
              <span className='rating'>{'★'.repeat(rating)}</span>
              <details className='card-short' name="trip"> {/* name attribute can be removed to allow for multiple expanded cards at once */}
                <summary>
                  {description}
                </summary>
                <div className='card-long'>
                  <p >{long_description}</p>
                </div>
              </details>
            </article>
          </div>
        </div>
    </>
  )
}