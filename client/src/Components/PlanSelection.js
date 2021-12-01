import "../Styles/Seats.scss";
import { useEffect, useContext, useState } from "react";

// NOTICE: the ID can only be from 0-9, no more, otherwise conflict in SeatReservation.js
const MAX_SEATS = 60;

const PlaneSelection = ({
  id: globalid,
  seatClick,
  availableSeats,
  userCabinClass,
  checkedSeates,
}) => {
  useEffect(() => {
    // disable the unavailable seats
    // const letters = ["A", "B", "C", "D", "E", "F"];
    // for (let i = 1; i <= 10; i++) {
    //   for (let j = 0; j < 6; j++) {
    //     const ltr = letters[j];
    //     const button = document.getElementById(`${i}${ltr}${id}`);
    //     if (avaiableSeats.includes(`${i}${ltr}`)) {
    //       button.disabled = false;
    //     } else {
    //       button.disabled = true;
    //     }
    //   }
    // }
    // // update the selected seats
    // if (selectedSeats) {
    //   for (let i = 0; i < selectedSeats.length; i++) {
    //     const button = document.getElementById(`${selectedSeats[i]}${id}`);
    //     button.checked = true;
    //   }
    // }
  }, []);

  const [rows, setrows] = useState([]);
  // let rows = [];

  useEffect(() => {
    setrows([]);
    // console.log(userCabinClass);
    const Row = ({ num, children }) => (
      <li class={"row row--" + num}>
        <ol class="seats" type="A">
          {children}
        </ol>
      </li>
    );
    const Seat = ({ id, type, disabled }) => (
      <li class={"seat-" + type}>
        <input
          type="checkbox"
          id={id + "" + globalid}
          onClick={seatClick}
          disabled={disabled}
          // checked={checkedSeates.includes(id) ? true : null}
        />
        <label for={id + "" + globalid}>{id}</label>
      </li>
    );

    // var allSeats = [];
    // for (let i = 0; i < availableSeats.first.length; i++) {
    //   const seatId = availableSeats.first[i];
    //   // console.log("pushing", seatId);
    //   allSeats.push(<Seat id={seatId} key={i} type="First" />);
    // }
    // for (let i = 0; i < availableSeats.business.length; i++) {
    //   const seatId = availableSeats.business[i];
    //   allSeats.push(<Seat id={seatId} key={i} type="Business" />);
    // }
    // for (let i = 0; i < availableSeats.economy.length; i++) {
    //   const seatId = availableSeats.economy[i];
    //   allSeats.push(<Seat id={seatId} key={i} type="Economy" />);
    // }
    // allSeats.reverse();
    // // console.log(allSeats);
    // let i = 0;
    // while (allSeats.length > 0) {
    //   i++;
    //   let seats = [];
    //   for (let j = 0; j < 6; j++) {
    //     seats.push(allSeats.pop());
    //   }
    //   // console.log(seats);
    //   setrows((rows) => [...rows, <Row num={i}>{seats}</Row>]);
    // }
    const ltrs = ["A", "B", "C", "D", "E", "F"];
    for (let i = 1; i <= MAX_SEATS / 6; i++) {
      //row
      const seats = [];

      for (let j = 1; j <= 6; j++) {
        const ltr = ltrs[j - 1];
        //column
        const seatId = `${i}${ltr}`;
        let disabled = false;
        if (
          userCabinClass === "First" &&
          !availableSeats.first.includes(seatId)
        )
          disabled = true;
        else if (
          userCabinClass === "Business" &&
          !availableSeats.business.includes(seatId)
        )
          disabled = true;
        else if (
          userCabinClass === "Economy" &&
          !availableSeats.economy.includes(seatId)
        )
          disabled = true;
        // check that userCabinClass is Valid just in case
        else if (
          userCabinClass !== "First" &&
          userCabinClass !== "Business" &&
          userCabinClass !== "Economy"
        ) {
          disabled = true;
          throw new Error(
            `Invalid Cabin Class (seatType), in PlanSelection.js expected on of: First, Business, Economy; got '${userCabinClass}'`
          );
        }

        seats.push(
          <Seat id={seatId} type={userCabinClass} disabled={disabled} />
        );
      }
      setrows((rows) => [...rows, <Row num={i}>{seats}</Row>]);
      // rows.push(<Row num={i}>{seats}</Row>);
    }
    // setrows(rows);
    // setrows([
    //   <Row num={1}>{[<Seat id={"2A"} />, <Seat id={"3A"} />]}</Row>,
    //   <Row num={2}>
    //     <li class="seat">
    //       <input type="checkbox" id={"2A"} onClick={seatClick} />
    //       <label for={"2A"}>1A</label>
    //     </li>
    //   </Row>,
    // ]);
  }, []);

  return (
    <>
      <div class="plane">
        <div class="cockpit">
          <h1>Please select a seat</h1>
        </div>
        <div class="exit exit--front fuselage"></div>
        <ol class="cabin fuselage">
          {rows}
          {/* <li class="row row--1">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"1A" + id} onClick={seatClick} />
                <label for={"1A" + id}>1A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1B" + id} onClick={seatClick} />
                <label for={"1B" + id}>1B</label>
              </li> */}
          {/* <li class="row row--2">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"2A" + id} onClick={seatClick} />
                <label for={"2A" + id}>2A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2B" + id} onClick={seatClick} />
                <label for={"2B" + id}>2B</label>
              </li> */}
        </ol>
        <div class="exit exit--back fuselage"></div>
        <div style={{ height: "3cm", width: "19cm", marginTop: "0.8cm" }}></div>
      </div>
    </>
  );
};

// old Return
/*
(
    <>
      <div class="plane">
        <div class="cockpit">
          <h1>Please select a seat</h1>
        </div>
        <div class="exit exit--front fuselage"></div>
        <ol class="cabin fuselage">
          <li class="row row--1">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"1A" + id} onClick={seatClick} />
                <label for={"1A" + id}>1A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1B" + id} onClick={seatClick} />
                <label for={"1B" + id}>1B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1C" + id} onClick={seatClick} />
                <label for={"1C" + id}>1C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1D" + id} onClick={seatClick} />
                <label for={"1D" + id}>1D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1E" + id} onClick={seatClick} />
                <label for={"1E" + id}>1E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"1F" + id} onClick={seatClick} />
                <label for={"1F" + id}>1F</label>
              </li>
            </ol>
          </li>
          <li class="row row--2">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"2A" + id} onClick={seatClick} />
                <label for={"2A" + id}>2A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2B" + id} onClick={seatClick} />
                <label for={"2B" + id}>2B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2C" + id} onClick={seatClick} />
                <label for={"2C" + id}>2C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2D" + id} onClick={seatClick} />
                <label for={"2D" + id}>2D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2E" + id} onClick={seatClick} />
                <label for={"2E" + id}>2E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"2F" + id} onClick={seatClick} />
                <label for={"2F" + id}>2F</label>
              </li>
            </ol>
          </li>
          <li class="row row--3">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"3A" + id} onClick={seatClick} />
                <label for={"3A" + id}>3A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"3B" + id} onClick={seatClick} />
                <label for={"3B" + id}>3B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"3C" + id} onClick={seatClick} />
                <label for={"3C" + id}>3C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"3D" + id} onClick={seatClick} />
                <label for={"3D" + id}>3D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"3E" + id} onClick={seatClick} />
                <label for={"3E" + id}>3E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"3F" + id} onClick={seatClick} />
                <label for={"3F" + id}>3F</label>
              </li>
            </ol>
          </li>
          <li class="row row--4">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"4A" + id} onClick={seatClick} />
                <label for={"4A" + id}>4A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"4B" + id} onClick={seatClick} />
                <label for={"4B" + id}>4B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"4C" + id} onClick={seatClick} />
                <label for={"4C" + id}>4C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"4D" + id} onClick={seatClick} />
                <label for={"4D" + id}>4D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"4E" + id} onClick={seatClick} />
                <label for={"4E" + id}>4E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"4F" + id} onClick={seatClick} />
                <label for={"4F" + id}>4F</label>
              </li>
            </ol>
          </li>
          <li class="row row--5">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"5A" + id} onClick={seatClick} />
                <label for={"5A" + id}>5A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"5B" + id} onClick={seatClick} />
                <label for={"5B" + id}>5B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"5C" + id} onClick={seatClick} />
                <label for={"5C" + id}>5C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"5D" + id} onClick={seatClick} />
                <label for={"5D" + id}>5D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"5E" + id} onClick={seatClick} />
                <label for={"5E" + id}>5E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"5F" + id} onClick={seatClick} />
                <label for={"5F" + id}>5F</label>
              </li>
            </ol>
          </li>
          <li class="row row--6">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"6A" + id} onClick={seatClick} />
                <label for={"6A" + id}>6A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"6B" + id} onClick={seatClick} />
                <label for={"6B" + id}>6B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"6C" + id} onClick={seatClick} />
                <label for={"6C" + id}>6C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"6D" + id} onClick={seatClick} />
                <label for={"6D" + id}>6D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"6E" + id} onClick={seatClick} />
                <label for={"6E" + id}>6E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"6F" + id} onClick={seatClick} />
                <label for={"6F" + id}>6F</label>
              </li>
            </ol>
          </li>
          <li class="row row--7">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"7A" + id} onClick={seatClick} />
                <label for={"7A" + id}>7A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"7B" + id} onClick={seatClick} />
                <label for={"7B" + id}>7B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"7C" + id} onClick={seatClick} />
                <label for={"7C" + id}>7C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"7D" + id} onClick={seatClick} />
                <label for={"7D" + id}>7D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"7E" + id} onClick={seatClick} />
                <label for={"7E" + id}>7E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"7F" + id} onClick={seatClick} />
                <label for={"7F" + id}>7F</label>
              </li>
            </ol>
          </li>
          <li class="row row--8">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"8A" + id} onClick={seatClick} />
                <label for={"8A" + id}>8A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"8B" + id} onClick={seatClick} />
                <label for={"8B" + id}>8B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"8C" + id} onClick={seatClick} />
                <label for={"8C" + id}>8C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"8D" + id} onClick={seatClick} />
                <label for={"8D" + id}>8D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"8E" + id} onClick={seatClick} />
                <label for={"8E" + id}>8E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"8F" + id} onClick={seatClick} />
                <label for={"8F" + id}>8F</label>
              </li>
            </ol>
          </li>
          <li class="row row--9">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"9A" + id} onClick={seatClick} />
                <label for={"9A" + id}>9A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"9B" + id} onClick={seatClick} />
                <label for={"9B" + id}>9B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"9C" + id} onClick={seatClick} />
                <label for={"9C" + id}>9C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"9D" + id} onClick={seatClick} />
                <label for={"9D" + id}>9D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"9E" + id} onClick={seatClick} />
                <label for={"9E" + id}>9E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"9F" + id} onClick={seatClick} />
                <label for={"9F" + id}>9F</label>
              </li>
            </ol>
          </li>
          <li class="row row--10">
            <ol class="seats" type="A">
              <li class="seat">
                <input type="checkbox" id={"10A" + id} onClick={seatClick} />
                <label for={"10A" + id}>10A</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"10B" + id} onClick={seatClick} />
                <label for={"10B" + id}>10B</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"10C" + id} onClick={seatClick} />
                <label for={"10C" + id}>10C</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"10D" + id} onClick={seatClick} />
                <label for={"10D" + id}>10D</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"10E" + id} onClick={seatClick} />
                <label for={"10E" + id}>10E</label>
              </li>
              <li class="seat">
                <input type="checkbox" id={"10F" + id} onClick={seatClick} />
                <label for={"10F" + id}>10F</label>
              </li>
            </ol>
          </li>
        </ol>
        <div class="exit exit--back fuselage"></div>
        <div style={{ height: "3cm", width: "19cm", marginTop: "0.8cm" }}></div>
      </div>
    </>
  )
  */

export default PlaneSelection;
