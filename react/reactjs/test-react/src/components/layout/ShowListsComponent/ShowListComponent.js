import React from 'react';

const showLists = (props) => {
  const transformedList = Object.keys(props.lists).map((item) => {
    return [...Array(props.lists[item])].map((_, index) => {
      return <p key={item + index}>{item}</p>;
    });
  });

  // console.log(transformedList);

  // console.log(
  //   transformedList.reduce((arr, el) => {
  //     return arr.concat(el);
  //   }, [])
  // );

  return transformedList;
};

export default showLists;
