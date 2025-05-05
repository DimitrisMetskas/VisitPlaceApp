import { useState } from "react";
import { useEffect } from "react";
import ProgressBar from "./ProgressBar";

const TIMER = 3000;

export default function DeleteConfirmation({ onConfirm, onCancel }) {

  //o logos poy xrisimopoioume edo to useEffect den einai gia na vazoume xronometro. 
  //einai gia na kleinoyme to xronometro se periptosi poy kapoios patisei ena koympi
  useEffect(()=>{
    //theloume tora na kleinei to parathiro poy anoigei otan pame na diagrapsoume ena stoixeio 
    //apo tin lista me tis epithimies meta apo kapoia deuterolepta
    //gia na ginei auto, na baloume dld timer, xrisimopoioyme ena akoma browser feature, to setTimeout
    //poy pairnei dio arguments, ena function kai tin diarkeia ton deyterolepton poy tha energopoihthei to function
    console.log('TIMER SET')
    const timer = setTimeout(()=> {
      onConfirm();//gia na kleisei to parathiro
    }, TIMER);//se milisecond
    //SOS me to useEffect, den orizoyme mono tin effect function alla kai mia cleanup 
    //function poy tha trexei ligo prin xanatrexei i effect function. Tin clean up function thn orizoyme
    //kanontas tin return apo tin effect function. Ara i clean up function tha trexei ligo prin xanatrexei i 
    //effect function i ligo prin olo to component (DeleteConfirmation.jsx) ginei dismount, dld stamatisei na trexei
    //opote stin sigkekrimeni periptosi ligo prin paei na kleisei to parathiro toy na diagrapsei to stoixeio
    return () => {
      console.log('Cleaning up timer')
      //autin tin bazoume gia na midenisei to xronometro, se periptosi poy patisoume kapoio koumpi
      clearTimeout(timer);
    }
  },
  [onConfirm]
);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
      {/* gia na vlepoyme tin parodo toy xronoy: */}
      <ProgressBar timer={TIMER}/>
    </div>
  );
}
