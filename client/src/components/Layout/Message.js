import React from 'react';
import useGlobal from '../../store';
import style from './Message.module.scss';

const Message = () => {
  const [globalState, globalActions] = useGlobal();
  const { message } = globalState;

  return (
    <div onClick={globalActions.ui.hideMessage} className={`${style.message} ${message.show ? style.display : ''}`}>
      <p>{message.content}</p>
    </div>
  );
};

export default Message;
