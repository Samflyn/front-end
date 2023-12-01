import React, { Component, Suspense } from 'react';
import {
  Route,
  Link,
  NavLink,
  Switch,
  Redirect,
  withRouter,
} from 'react-router-dom';
import Page1 from './Page1/Page1';
import Page2 from './Page2/Page2';
import asyncComponent from '../../hoc/asyncComponent';
import { connect } from 'react-redux';

// The route package adds extra info to props
// these props are only added to the component that is rendered by the route
// these props are not passed down the component tree
// to get the props of the nearest route rendered component,
// export the component wrapped with export default withRouter(component)
// withRouter is a hoc from react-router-dom

// For lazy loading
const AsyncNewPage = asyncComponent(() => import('./LazyLoading/lazyLoaded'));

// For react 16.6 and above, only default export should be used, named exports are not suported
const ReactLazy = React.lazy(() => import('./LazyLoading/lazyLoaded'));

class RoutingComponent extends Component {
  // componentDidMount() {
  //   const query = new URLSearchParams(this.props.location.search);
  //   for (let param of query.entries()) {
  //     console.log(param); // yields ['start', '5']
  //   }
  // }

  // to route programatically
  // redirectHandler = () => {
  //   // this.props.history.push({ pathname: '/' });
  //   this.props.history.push('/');
  // };

  render() {
    return (
      <div>
        <h1>Routing</h1>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              {/* This is an absolute path */}
              {/* For relative path use <Link to={props.match.url + '/new'}> */}
              {/* For creating link always use encodeURIComponent */}
              <Link
                to={{
                  pathname: '/page/1',
                  hash: '#submit',
                  search: '?showMe=true',
                }}
              >
                Page 1
              </Link>
            </li>
            <li>
              {/* To know if the route is active, if active it adds css class active, activestyle for inline style */}
              <NavLink
                exact
                to={'/page/' + Math.floor(Math.random() * 10)}
                activeClassName="my-active"
                activeStyle={{ color: 'blue', textDecoration: 'underline' }}
              >
                Page 2
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* To render a JSX Snippet */}
        <Route
          path="/"
          exact
          render={() => {
            return <h3>Home Page</h3>;
          }}
        />
        {/* To only render the first matching route */}
        <Switch>
          {/* To render components */}
          <Route path="/page/1" exact component={Page1} />

          {/* Dynamic  */}
          <Route path="/page/:id" exact component={Page2} />

          {/* Lazy loading */}
          <Route path="/lazy" exact component={AsyncNewPage} />

          {/* React 16.6 and above, fallback is used when react postpones the rendering of reactlazy */}
          {/* Will not work on server side rendering */}
          <Route
            path="/reactlazy"
            render={() => (
              <Suspense fallback={<div>Loading...</div>}>
                <ReactLazy />
              </Suspense>
            )}
          />

          {/* Redirect, if used outside switch from cannot be specified and it will always use to */}
          {/* It dosen't render content byt only changes url */}
          {/* It can be redirected on a state change when not used inside switch */}
          {/* Redirect replaces the page in stack, instead we can also use props.history.replace('/') */}
          {/* For guards we use state on the route, if the route is not rendered it will not render the component connected to it */}
          <Redirect from="/*" to="/" />
        </Switch>
      </div>
    );
  }
}

// https://stackoverflow.com/questions/49384270
export default withRouter(connect(null, null)(RoutingComponent));

// export default RoutingComponent;
