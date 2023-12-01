// // import { render, screen } from '@testing-library/react';
// import App from './App';

// import { configure, shallow } from 'enzyme';
// // import Adapter from 'enzyme-adapter-react-17'

// // test('renders learn react link', () => {
// //   render(<App />);
// //   const linkElement = screen.getByText(/learn react/i);
// //   expect(linkElement).toBeInTheDocument();
// // });

// // TESTING
// // the .test.js files will automatically picked up by react when running in test mode
// // testing by default uses JEST
// // enzyme is used to render a component independent of the entire application

// // shallow is used to render the react component
// // it renders the component with all its components but the components are not deeply rendered i.e the sub tree of component is not rendered

// configure({ adapter: new Adapter() });

// // describe will be made available when run as a test
// // there are also beforeeach aftereach and so on
// describe('name of test', () => {
//   it('should display title', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find()).toHaveLength(2);
//   });

//   it('should display something', () => {
//     const wrapper = shallow(<App />);
//     expect(wrapper.find()).toHaveLength(2);
//   });
// });
