import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  sendMessage,
  getMessages,
  getUserIds,
} from '../store/actions/messageActions';
import { connect } from 'react-redux';
import '../stylesheets/chat.css';

export const Chat = ({
  auth,
  profile,
  sendMessage,
  getMessages,
  getUserIds,
  userIds,
  messages,
}) => {
  const [params, setParams] = useState({});
  const [chatText, setChatText] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    setChatText('');
    sendMessage(params);
  };

  const isFirstRun = useRef(true);
  const chat = useParams().chatId;

  useEffect(() => {
    getMessages(chat);
    getUserIds(chat);

    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendMessage]);

  const handleInputChange = event => {
    setChatText(event.target.value);
    setParams({
      chatId: chat,
      senderId: auth.uid,
      senderName: profile.firstName,
      recipientId: userIds[0] === auth.uid ? userIds[0] : userIds[1],
      text: event.target.value,
    });
  };

  return (
    <div className='chat-page'>
      <div className='chat-container'>
        <div className='chat-messages'>
          {messages &&
            messages.map(message => {
              if (message.senderId === auth.uid) {
                return (
                  <p className='sender-msg msg-bubble'>{message.text} :You</p>
                );
              } else {
                return (
                  <p className='recepient-msg msg-bubble'>
                    {message.senderName}: {message.text}
                  </p>
                );
              }
            })}
        </div>
        <form onSubmit={handleSubmit} className='chat-form'>
          <textarea
            value={chatText}
            type='text'
            onChange={handleInputChange}
            name='message'
            className='chat-text-area'
            placeholder='Start a discussion...'
          />
          <button type='submit' className='chat-button'>
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    messages: state.chat.messages,
    userIds: state.chat.userIds,
    profile: state.firebase.profile,
    profileData: state.profileData.profileData,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: params => dispatch(sendMessage(params)),
    getMessages: chatId => dispatch(getMessages(chatId)),
    getUserIds: chatId => dispatch(getUserIds(chatId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
