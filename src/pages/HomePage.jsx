import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-container">
      <div className="content">
        <h1>Welcome to the Chat App</h1>
        <Link to="/signup" className="btn btn-primary">Go to Signup</Link>
      </div>
    </div>
  );
}

export default HomePage;
