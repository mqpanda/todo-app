import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link to="/login">Sign in</Link>
      <Link to="/register">Sign up</Link>
    </div>
  )
}

export { HomePage }
