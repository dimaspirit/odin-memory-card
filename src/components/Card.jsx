import './Card.css'

function Card({movie, onClick}) {
  return (
    <div className="card" key={movie.id} onClick={() => onClick(movie.id)}>
      <img src={movie.poster} />
    </div>
  )
}

export default Card
