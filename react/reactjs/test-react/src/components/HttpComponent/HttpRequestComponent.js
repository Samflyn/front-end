import React, { Component } from 'react';
import axios from 'axios';

class HttpRequestComponent extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    axios.get('/posts').then((response) => {
      this.setState({ posts: response.data.slice(0, 5) });
    });
  }

  render() {
    const posts = this.state.posts.map((post, index) => {
      return (
        <li key={post + index}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
        </li>
      );
    });
    return <ul>{posts}</ul>;
  }
}

export default HttpRequestComponent;
