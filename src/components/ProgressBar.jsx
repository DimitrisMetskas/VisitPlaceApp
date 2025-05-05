import { useState, useEffect } from "react";    

export default function ProgressBar({timer}){
      //gia na kataferoume na dixnoume proodo toy xronometroy, poy pernaei kai meta tha 
      //svistei apo mono toy to stoixeio poy epilexame xrisimopoioyme :
      const [remainingTime, setRemainingTime] = useState(timer)
      //vazoume to setInterval mesa se useEffect gia na min kanei infinete loop
      useEffect(()=>{
        //ena allo broser function, to setInterval. paromoio me to setTimeout, aplos to setInterval pairnei 
          //to proto argument mia function poy tha ekteleitai kathe toso, oso orizei to deutero argument
          const interval = setInterval(()=>{
            console.log('INTERVAL');
            setRemainingTime(prevTime => prevTime-10);
          },10);
          //gia na min trexei sto apiro to setInterval, prepei na orisoume kai mia clean up function 
          //gia na to stamata, OTAN kleinei to component, dld otan kanei dismount to DeleteConfirmation.jsx
          return ()=>{
            clearInterval(interval);//gia na stamataei to xronometriti
          };
    
      },[])

      return <progress value={remainingTime} max={timer} />
}