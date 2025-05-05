import { useRef, useState, useEffect , useCallback} from 'react';

import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js'


const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; 
const storedPlaces = storedIds.map((id) =>
    AVAILABLE_PLACES.find((place)=> place.id === id));


function App() {
  //apo ekei poy xrisimopoioysa to const modal(useRef) gia na anoigo kai na kleino to 
  //parathiro(tis diagrafis), efoson allaxa sto Modal.jsx to imperative se useEffect, 
  //allazo kai to useRef se useState
  //const modal = useRef();//den xreiazetai
  //kai pleon, gia na anoigoyme kai na kleinoyme to modal xrisimopoioyme parakato to useState
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(()=>{//edo ayto to useEffect ekteleitai mia fora, gt den allazei i topothesia toy xristi.

    navigator.geolocation.getCurrentPosition((position)=>{
    const sortedPlaces = sortPlacesByDistance(
      AVAILABLE_PLACES,
      position.coords.latitude, 
      position.coords.longitude
    );
    setAvailablePlaces(sortedPlaces);
  });
  },[]
);


  function handleStartRemovePlace(id) {
    //pleon allazoume ton tropo poy diaxeirizomaste to open kai close toy modal
    // modal.current.open();
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });


    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; 

    if (storedIds.indexOf(id) === -1){
      localStorage.setItem('selectedPlaces', JSON.stringify([id, ...storedIds]));
    }
  }
  //dimiourgeitai to provlima infinete looop ean valeis function san dependancy mesa se 
  //useEffect(mesa sto DeleteConfirmation.jsx) gt tha trexei ep aoristo to programma, gt kathe fora poy
  //trexei etrexe to useEffect ekane to App function na xanatrexei. kathe fora poy xanatrexei to App function,
  //dimiourgountai nees function. OI FUNCTION DEN EINAI POTE OI IDIES, OUTE KAI TA VARIABLES. KATHE FORA POY XANATREXOUN
  //DIMIOURGOUNTAI NEES. Opote tha xanaenergopoiountan to useEffect gt to dependency toy(i function) tha allaze
  //sto sigkekrimeno programma den exoume auto to provlima gt tigxanei na kleinei kathe 
  //fora kai na min trexei afou orizoume to open= false me to setModalIsOpen(false)
  //alla gia na doyme tin leitourgia tou useCallback svinoume to setModalIsOpen(false)

  //parakato xrisimopoioume to useCallback, auto to xrisimopoioyme gia na kratisoume tin 
  //function poy pairnei san proto argument anepafi mesa stin memori kai na min allazei, me to neo treximo toy app function.
  //to deutero argument einai ena array of dependancies(opos to useEffect)
  //to useCallback epistrefei to return 
  const handleRemovePlace = useCallback(  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    //gia na doume to useCallback, to diagrafoume to sigkekrimeno setModalIsOpen(false)
    setModalIsOpen(false);//kai meta to xanavazoume gia extra asfaleia..

    const storedIds = JSON.parse(localStorage.getItem('selectedPlaces')) || []; 
    localStorage.setItem(
      'selectedPlaces', 
      JSON.stringify(storedIds.filter((id) => id != selectedPlace.current))//sigkrinei gia kathe id toy array storedIds ean to sigkekrimeno stoixeio id poy epelexa na sviso einai idio me to id toy array 
    );
  },
//edo einai ta dependacies.(ayta einai props,objects,values,function poy xrisimopouountai stin function parapano)
  []
)


  return (
    <>
      {/* <Modal ref={modal}> pleon anoigoume to modal diaforetika, opos parakato: */}
      {/* otan patame esc kleinei to parathiro, alla den enimeronetai to open na ginei false.
      etsi me to onClose={handleStopRemovePlace} einai gia na ginetai to open false kai na 
      dld na enimeronetai to modalIsOpen gia na trexei omala */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText='Sorting places by distance...'
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  ); 
}

export default App;
