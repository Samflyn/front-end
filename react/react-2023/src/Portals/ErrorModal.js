import { createPortal } from 'react-dom';

const ErrorModal = (props) => {
  // createPortal takes two arguments, the first is the component we need to render i.e the jsx
  // the second is the pointer to the container in the real where this element should be rendered
  return (
    <>{createPortal(<ErrorModal />, document.getElementById('error-modal'))}</>
  );
};

export default ErrorModal;
