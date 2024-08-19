import { Link } from 'react-router-dom';
import './ErrorPage.css';


const ErrorPage = () => {

  return (
    <div className="row row-cols-1 row-cols-md-1 error-container">
      <div className="col-8 col-md-8">
        <h1>404</h1>
        <p>PAGE NOT FOUND. GO <Link to='/'>HOME</Link></p>
      </div>
    </div>
  )
}
export default ErrorPage;