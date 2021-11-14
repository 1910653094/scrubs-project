import React from 'react';
import './css/modal.css';

const Modal = ({modalGiveScrubChange })=>{
    const onSubmitBtn = () => {
        modalGiveScrubChange(false);
       
      };
    return(
      <div className="modal">
          <h2>제목</h2>
          <p>날짜</p>
          <p>상세내용</p>
          <button onClick={() => onSubmitBtn()}>Close</button>
        </div>
    )
  }

export default Modal;