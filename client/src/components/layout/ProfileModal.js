import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { GiCoffeeCup } from 'react-icons/gi';

const ProfileModal = ({
  auth,
  profile,
  modalIsOpen,
  setModalIsOpen,
  updateProfile,
  updateProfileImage,
}) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState(profile);

  useEffect(() => {
    setInfo(profile);
  }, [profile]);

  Modal.setAppElement('#root');

  function closeModal() {
    setModalIsOpen(false);
  }

  const handleSubmit = event => {
    event.preventDefault();
    closeModal();
    updateProfile(auth.uid, info);
  };

  const handleInputChange = event => {
    setInfo(info => ({
      ...info,
      [event.target.name]: event.target.value,
    }));
  };

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpload(e) {
    e.preventDefault();

    updateProfileImage(auth.uid, file);
  }

  const handleAvailability = event => {
    if (profile.availableForFika) {
      setInfo(info => ({
        ...info,
        availableForFika: !profile.availableForFika,
      }));
    } else {
      setInfo(info => ({
        ...info,
        availableForFika: true,
      }));
    }
  };

  return (
    <Modal
      className='Modal'
      overlayClassName='Overlay'
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel='Example Modal'>
      <h4>Update your profile.</h4>

      <form onSubmit={handleSubmit}>
        <input
          type='text'
          onChange={handleInputChange}
          name='firstName'
          placeholder={profile.firstName}
        />
        <input
          type='text'
          onChange={handleInputChange}
          name='lastName'
          placeholder={profile.lastName}
        />
        <input
          type='text'
          onChange={handleInputChange}
          name='location'
          placeholder={
            profile.location ? profile.location : 'Add your location here.'
          }
        />

        <textarea type='text' onChange={handleInputChange} name='bio' />

        <label>
          <input
            type='checkbox'
            onChange={handleAvailability}
            defaultChecked={profile.availableForFika}
          />
          <span>
            <GiCoffeeCup /> Available For Fika
          </span>
        </label>
        <button type='submit'>Save Changes</button>
      </form>
      <div>
        <form onSubmit={handleUpload}>
          <input type='file' onChange={handleChange} />
          <br></br>
          <button disabled={!file}>upload to firebase</button>
        </form>
      </div>
      <p></p>
      <button onClick={closeModal}>close</button>
      <p></p>
    </Modal>
  );
};

export default ProfileModal;