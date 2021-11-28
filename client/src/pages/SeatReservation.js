import {useEffect} from 'react';
import "../Styles/Seats.scss"
import Button from "react-bootstrap/Button";
const SeatReservation = (props) => {
  //allData = {flights,flights2,seatType}
  //flights={flightDet:{flight details}, finalPrice}
  const allData = props.location.state;

var selectedSeats = []; // this array contains the ids of the selected seats forex ["1A", "2B", "3C"]
const SeatReservation = ({flight}) => {
  useEffect(() => {
    // this code excutes when the page loads
    // update el inputs bel to be either checked or unavailble
    const buttons = document.getElementsByTagName('input');
    // loop through all the inputs, and check if the seat is available or not
    for (let i = 0; i < buttons.length; i++) {
      const button = buttons[i];
      // if (!flight.seats[i].available) // FIX: based on whatever bon will make this object
        button.disabled = true;
    }
  }, [])

  
  function seatClick(e)  {
    const isChecked = e.target.checked;
    const seatID  = e.target.id;

    if(isChecked)
      selectedSeats.push(seatID);
    else
      selectedSeats.splice(selectedSeats.indexOf(seatID), 1);

    console.log(selectedSeats);
  }

return (
<div class="plane">
  <div class="cockpit">
    <h1>Please select a seat</h1>
  </div>
  <div class="exit exit--front fuselage">
    
  </div>
  <ol class="cabin fuselage">
    <li class="row row--1">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="1A" onClick = {seatClick}/>
          <label for="1A">1A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1B" onClick = {seatClick}/>
          <label for="1B">1B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1C" onClick = {seatClick}/>
          <label for="1C">1C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1D" onClick = {seatClick}/>
          <label for="1D">Occupied</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1E" onClick = {seatClick}/>
          <label for="1E">1E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="1F" onClick = {seatClick}/>
          <label for="1F">1F</label>
        </li>
      </ol>
    </li>
    <li class="row row--2">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="2A" onClick = {seatClick}/>
          <label for="2A">2A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2B" onClick = {seatClick}/>
          <label for="2B">2B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2C" onClick = {seatClick}/>
          <label for="2C">2C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2D" onClick = {seatClick} />
          <label for="2D">2D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2E" onClick = {seatClick}/>
          <label for="2E">2E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="2F" onClick = {seatClick}/>
          <label for="2F">2F</label>
        </li>
      </ol>
    </li>
    <li class="row row--3">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="3A" onClick = {seatClick}/>
          <label for="3A">3A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3B" onClick = {seatClick}/>
          <label for="3B">3B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3C" onClick = {seatClick}/>
          <label for="3C">3C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3D" onClick = {seatClick}/>
          <label for="3D">3D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3E" onClick = {seatClick}/>
          <label for="3E">3E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="3F" onClick = {seatClick}/>
          <label for="3F">3F</label>
        </li>
      </ol>
    </li>
    <li class="row row--4">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="4A" onClick = {seatClick}/>
          <label for="4A">4A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4B" onClick = {seatClick}/>
          <label for="4B">4B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4C" onClick = {seatClick}/>
          <label for="4C">4C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4D" onClick = {seatClick}/>
          <label for="4D">4D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4E" onClick = {seatClick}/>
          <label for="4E">4E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="4F" onClick = {seatClick}/>
          <label for="4F">4F</label>
        </li>
      </ol>
    </li>
    <li class="row row--5">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="5A" onClick = {seatClick}/>
          <label for="5A">5A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5B" onClick = {seatClick}/>
          <label for="5B">5B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5C" onClick = {seatClick}/>
          <label for="5C">5C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5D" onClick = {seatClick}/>
          <label for="5D">5D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5E" onClick = {seatClick}/>
          <label for="5E">5E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="5F" onClick = {seatClick}/>
          <label for="5F">5F</label>
        </li>
      </ol>
    </li>
    <li class="row row--6">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="6A" onClick = {seatClick}/>
          <label for="6A">6A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6B" onClick = {seatClick}/>
          <label for="6B">6B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6C" onClick = {seatClick}/>
          <label for="6C">6C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6D" onClick = {seatClick}/>
          <label for="6D">6D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6E" onClick = {seatClick}/>
          <label for="6E">6E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="6F" onClick = {seatClick}/>
          <label for="6F">6F</label>
        </li>
      </ol>
    </li>
    <li class="row row--7">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="7A" onClick = {seatClick}/>
          <label for="7A">7A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7B" onClick = {seatClick}/>
          <label for="7B">7B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7C" onClick = {seatClick}/>
          <label for="7C">7C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7D" onClick = {seatClick}/>
          <label for="7D">7D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7E" onClick = {seatClick}/>
          <label for="7E">7E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="7F" onClick = {seatClick}/>
          <label for="7F">7F</label>
        </li>
      </ol>
    </li>
    <li class="row row--8">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="8A" onClick = {seatClick}/>
          <label for="8A">8A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8B" onClick = {seatClick}/>
          <label for="8B">8B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8C" onClick = {seatClick}/>
          <label for="8C">8C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8D" onClick = {seatClick}/>
          <label for="8D">8D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8E" onClick = {seatClick}/>
          <label for="8E">8E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="8F" onClick = {seatClick}/>
          <label for="8F">8F</label>
        </li>
      </ol>
    </li>
    <li class="row row--9">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="9A" onClick = {seatClick}/>
          <label for="9A">9A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9B" onClick = {seatClick}/>
          <label for="9B">9B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9C" onClick = {seatClick}/>
          <label for="9C">9C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9D" onClick = {seatClick}/>
          <label for="9D">9D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9E" onClick = {seatClick}/>
          <label for="9E">9E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="9F" onClick = {seatClick}/>
          <label for="9F">9F</label>
        </li>
      </ol>
    </li>
    <li class="row row--10">
      <ol class="seats" type="A">
        <li class="seat">
          <input type="checkbox" id="10A" onClick = {seatClick}/>
          <label for="10A">10A</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10B" onClick = {seatClick}/>
          <label for="10B">10B</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10C" onClick = {seatClick}/>
          <label for="10C">10C</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10D" onClick = {seatClick}/>
          <label for="10D">10D</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10E" onClick = {seatClick}/>
          <label for="10E">10E</label>
        </li>
        <li class="seat">
          <input type="checkbox" id="10F" onClick = {seatClick}/>
          <label for="10F">10F</label>
        </li>
      </ol>
    </li>
  </ol>
  <div class="exit exit--back fuselage">
    
  </div>
  <div  style={{height:"3cm",width:"19cm",marginTop:"0.8cm"}}>
  <Button   variant="primary" type="confirm">
    Confirm Seats
  </Button>
  </div>
</div>
);
}

export default SeatReservation;