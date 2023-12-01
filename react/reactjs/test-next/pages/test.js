import React from 'react';
import Link from 'next/link';
import Router from 'next/router';

const Test = () => {
  return (
    <div>
      <h1>Welcome to test page</h1>
      <p>
        Go to <Link href="/api/hello">One</Link>
      </p>
      <button onClick={() => Router.push('/api/hello')}>Got to One</button>
    </div>
  );
};

export default Test;
