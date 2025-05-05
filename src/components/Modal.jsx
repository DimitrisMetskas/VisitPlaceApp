import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({open, children, onClose }) {
  const dialog = useRef();

//anti gia to useIperativeHandle gia na anoigei kai na kleinei to dialog xrisimopoioyme to useEffect.
//to useEffect anagkazetai na trexei xana, otan fortonei olo to Modal.jsx i OTAN kapoio apo ta 
//dependancies(to deutero meros dld) toy allaxoun kai tha anagkasoyne kai to programma na trexei xana. 
//Sto sigkekrimeno, afou to open tha allazei apo true se false tha anagkazei to useEffect na xanatrexei.
//Gia na ginei auto prepei na perasoume kai dependanties
  useEffect(() => {
    if (open) {//ean einai alhtheis to open
      dialog.current.showModal();
    } else {
      dialog.current.close(); 
    }

  }, 
    //toy dinoyme mia callback function, poy tha anagkazei to programma 
    //toy useEffect na xanatrexei otan to open metavaletai:
  [open]
);



  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose}>
      {/* parakato, ean einai to open true tha anoixei to DeleteConfirmation.jsx */}
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
};

export default Modal;
