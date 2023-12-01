import { useContext } from 'react';
import AuthContext from '../../store/auth-context';

// Without react hooks
// const UsingContext = () => {
//   return (
//     <AuthContext.Consumer>
//       {(ctx) => {
//         return (
//           <p>Is isLoggedIn: {ctx.isLoggedIn === false ? 'false' : 'true'}</p>
//         );
//       }}
//     </AuthContext.Consumer>
//   );
// };

// With react hooks
const UsingContext = () => {
  const ctx = useContext(AuthContext);

  return <p>Is isLoggedIn: {ctx.isLoggedIn === false ? 'false' : 'true'}</p>;
};

export default UsingContext;
