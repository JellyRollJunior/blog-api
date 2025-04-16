import { Link } from 'react-router-dom';

const ReturnHomeButton = () => {
  return (
    <Link to="/">
      <div style={{ textAlign: 'center' }}>Return to main page</div>
    </Link>
  );
};

export { ReturnHomeButton };
