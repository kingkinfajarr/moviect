import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <div className="text-3xl font-bold underline">HomePage</div>
      <Link to={'/about'}>to About</Link>
    </>
  );
}

export default HomePage;
