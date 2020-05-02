import React, { useState, useEffect } from 'react';
import useGlobal from '../../store';
import styles from './Avatar.module.scss';
import placeholderImg from '../../images/portrait_placeholder.jpg';

const Avatar = () => {
  const [globalState, globalActions] = useGlobal();
  const { user, avatarLoading } = globalState;
  const [currentAvatar, setCurrentAvatar] = useState(user.avatar && user.avatar.length > 0 ? user.avatar : null);
  const [image, setImage] = useState(null);
  const [modalIsDisplayed, setModalIsDisplayed] = useState(false);

  function handleClick() {
    document.getElementById('selectAvatar').click();
  }

  function handleChange(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('upload', image);
    setImage(null);
    setModalIsDisplayed(false);
    
    const avatar = await globalActions.user.uploadAvatar(formData);
    setCurrentAvatar(avatar);
  }

  function handleDelete() {
    globalActions.user.deleteAvatar();
    setCurrentAvatar(null);
    setModalIsDisplayed(false);
  }

  useEffect(() => {
    if (image) {
      document.getElementById('submitAvatar').click();
    }
  }, [image]);

  return (
    <div className={styles.avatarSection}>
      <div onClick={() => setModalIsDisplayed(true)} className={styles.imgWrapper}>
        {currentAvatar && !avatarLoading && <img src={`data:image/png;base64, ${currentAvatar}`} alt="Avatar" />}
        {!currentAvatar && !avatarLoading && <img src={placeholderImg} alt="Placeholder avatar" />}
        {avatarLoading && <p>Loading...</p>}
      </div>
      <p className={styles.imgChange} onClick={() => setModalIsDisplayed(true)}>
        Change profile photo
      </p>

      {modalIsDisplayed && (
        <div className={styles.modalContainer}>
          <div onClick={() => setModalIsDisplayed(false)} className={styles.modalBackdrop}></div>

          <div className={styles.modalContent}>
            <div className={styles.modalImgWrapper}>
              {!avatarLoading && currentAvatar ? (
                <img src={`data:image/png;base64, ${currentAvatar}`} alt="Avatar" />
              ) : (
                <img src={placeholderImg} alt="Placeholder avatar" />
              )}
            </div>

            <div className={styles.modalButtons}>
              <button onClick={handleClick} className="btn btn-secondary">
                Upload photo
              </button>
              <button onClick={handleDelete} className="btn btn-secondary--outline">
                Remove current photo
              </button>
              <button onClick={() => setModalIsDisplayed(false)} className="btn btn-primary--outline">
                Cancel
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'none' }}>
              <input id="selectAvatar" onChange={handleChange} name="image" type="file" required />
              <button id="submitAvatar" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Avatar;
