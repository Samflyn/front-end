import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

const Login = () => {
  const ctx = useContext(AuthContext);

  // we can access the loginIn flag here
  console.log(ctx.isLoggedIn);

  return <></>;
};

export default Login;
