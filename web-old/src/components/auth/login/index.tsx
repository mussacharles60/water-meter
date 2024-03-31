import { useContext, useEffect, useRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import DatabaseManager from '../../../service';
import AuthContext from '../../../service/context';
import Routes from '../../../utils/routes';
import Themer from '../../../utils/themer';
import './index.scss';


const Login = () => {

  const history = useHistory();
  const didMount = useRef(false);
  const contextType = useContext(AuthContext);
  const databaseManager: DatabaseManager = new DatabaseManager();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isInvalid, setIsInvalid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    didMount.current = true;
    const user_id = localStorage.getItem("app-uid");
    if (user_id) {
      contextType.setIsAuthenticated(true);
      let { from }: any = history.location.state || {
        from: { pathname: Routes.Dashboard },
      };
      history.replace(from);
    }
    Themer.subscribe();
    document.title = "Login - Water Meter";

    return () => {
      didMount.current = false;
      Themer.unsubscribe();
    };
  }, []);

  const onEmailChange = (event: any) => {
    setEmail(event.target.value);

    if (email.length < 5 || password.length < 3) {
      setIsInvalid(true);
    }
    if (email.length > 5 || password.length > 3) {
      setIsInvalid(false);
    }
  };

  const onPasswordChange = (event: any) => {
    setPassword(event.target.value);

    if (email.length < 5 || password.length < 3) {
      setIsInvalid(true);
    }
    if (email.length > 5 || password.length > 3) {
      setIsInvalid(false);
    }
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!didMount.current) return;

    // check if email is valid
    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    // check if password is valid
    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setError(null);

    databaseManager.loginUser(email, password).then((result: any) => {
      if (!didMount.current) return;
      setIsLoading(false);
      if (result) {
        // console.log('result: ', result);
        if (result.success && result.success.data && result.success.data.length > 0) {
          const name = result.success.data[0].name;
          const user_id = result.success.data[0].id;
          localStorage.setItem('app-un', name);
          localStorage.setItem('app-uid', user_id);

          contextType.setIsAuthenticated(true);
          let { from }: any = history.location.state || {
            from: { pathname: Routes.Dashboard },
          };
          history.replace(from);
        }
        else {
          setError('Could not login. Reason: ' + result.error.message);
        }
      }
      else {
        setError('Could not login. Reason, User Login Error!');
      }
    }).catch(() => {
      if (!didMount.current) return;
      setIsLoading(false);
      setError('Could not login. Reason, User Login Error!');
    });
  }

  return (
    <div className='login-main'>
      <div className='header-lay'>
        <span className='ttle-txt'>Water Meter</span>
      </div>
      <div className='body-lay'>
        <form className='form-lay' onSubmit={onSubmit}>
          <span className='form-ttle'>Login</span>
          <input
            required={true}
            className='email-input input'
            name='email'
            value={email}
            onChange={onEmailChange}
            type='text'
            autoComplete='email'
            placeholder='Email Address' />
          <input
            required={true}
            className='password-input input'
            name='password'
            value={password}
            onChange={onPasswordChange}
            type='password'
            autoComplete='current-password'
            placeholder='Password' />
          <button
            className='login-btn'
            disabled={isInvalid}
            type='submit'>
            Log In
          </button>

          {isLoading && <i className="fa-li fa fa-spinner fa-spin loading-icon"></i>}
          {error && <p className="message-box">{error}</p>}
          <Link to={Routes.PasswordForget} className='signup-btn'>
            Forget Password
          </Link>
          <Link to={Routes.Signup} className='signup-btn'>
            Create Account
          </Link>
          <div className='footer-lay'>
            <div className='footer-seg'>
              <Link className='footer-link' to={Routes.Landing} target='_blank' rel='noreferrer'>Home</Link>
              <Link className='footer-link' to={Routes.Privacy} target='_blank' rel='noreferrer'>Privacy</Link>
              <Link className='footer-link' to={Routes.Terms} target='_blank' rel='noreferrer'>Terms</Link>
            </div>
            <div className='footer-seg'>
              <span className='footer-text'>Copyright &copy;</span>
              <a className='footer-link' href='https://watermeter.co.tz' target='_blank' rel='noreferrer'>Water Meter Tz</a>
              <span className='footer-text'>2023</span>
            </div>
            <div className='footer-seg'>
              <span className='footer-text'>All Rights Reserved</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;