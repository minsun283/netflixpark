import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ModalVideo.style.css'
import YouTube from 'react-youtube';

  const ModalComponent = video => {
    const onPlayerReady = event => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    };
  
    const opts = {
      
      width: '100%',
      playerVars: {
      autoplay: 1, // 자동 재생 활성화
      controls: 1,
      },
    };



    return (
      
      <Modal {...video} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
       
        <Modal.Body>
        <div>

        <YouTube videoId="2g811Eo7K8U" opts={opts} />;

        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={video.onHide}>Close</Button>
      </Modal.Footer>
      </Modal>
    );
  };

  
export default ModalComponent;