import React, { Component } from 'react';

import ShowListComponent from './ShowListsComponent/ShowListComponent';

class Layout extends Component {
  state = {
    lists: {
      one: 1,
      two: 1,
      three: 2,
      four: 2,
    },
  };

  render() {
    return <ShowListComponent lists={this.state.lists} />;
  }
}

export default Layout;
