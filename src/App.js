import React, { useState } from "react"
import "./App.css"
import moment from "moment"
function App() {
  const [selectedDate, setSelectedDate] = useState(moment())
  const [showMonthInput, setShowMonthInput] = useState(false)
  const [showYearInput, setShowYearInput] = useState(false)
  const daysInMonth = () => selectedDate.daysInMonth()
  const selectedCurrentDate = () => selectedDate.get("date")
  const gapsToBeLeft = () => moment(selectedDate).startOf("month").format("d")

  let cellNumber = 1
  let totalCells = []
  let oneRow = []
  let completeTable = []
  //Front
  for (let index = 0; index < gapsToBeLeft(); index++) {
    totalCells.push(
      <td className="calendar-table-cell-container" key={"gaps-" + cellNumber}></td>
    )
    cellNumber++
  }
  // Date
  for (let index = 1; index <= daysInMonth(); index++) {
    totalCells.push(
      <td className="calendar-table-cell-container" key={"date-" + cellNumber}>
        {index}
      </td>
    )
    cellNumber++
  }

  //Gaps at back

  for (
    let index = parseInt(gapsToBeLeft()) + parseInt(daysInMonth);
    index % 7 == 0;
    index++
  ) {
    totalCells.push(
      <td className="calendar-table-cell-container" key={"gaps-" + cellNumber}></td>
    )
    cellNumber++
  }

  totalCells.forEach((cell, index) => {
    if (index % 7 !== 0) {
      oneRow.push(cell)
    } else {
      let currRow = oneRow.slice()
      completeTable.push(
        <tr className="calendar-table-row-container" key={"row-" + cellNumber}>
          {currRow}
        </tr>
      )
      cellNumber++
      oneRow = []
      oneRow.push(cell)
    }
    if (index === totalCells.length - 1) {
      let currRow = oneRow.slice()
      completeTable.push(
        <tr className="calendar-table-row-container" key={"row-" + cellNumber}>
          {currRow}
        </tr>
      )
      cellNumber++
    }
  })
  console.log(selectedDate)
  const setYear = year => {
    console.log(year)
    setSelectedDate(moment(selectedDate).set("year", year))
  }
  const setMonth = month => {
    setSelectedDate(moment(selectedDate).set("month", month))
  }
  const renderMonthInput = () => {
    if (showMonthInput) {
      return (
        <select
          onChange={event => {
            setMonth(moment.months().indexOf(event.target.value))
          }}
          value={selectedDate.format("MMMM")}
          onDoubleClick={() => {
            setShowMonthInput(false)
          }}
        >
          {moment.months().map(data => (
            <option id={"month-data"} key={data}>
              {data}
            </option>
          ))}
        </select>
      )
    } else {
      return (
        <div
          onDoubleClick={() => {
            setShowMonthInput(true)
            setShowYearInput(false)
          }}
        >
          {selectedDate.format("MMMM")}
        </div>
      )
    }
  }
  const renderYearInput = () => {
    if (showYearInput) {
      return (
        <input
          type={"number"}
          value={selectedDate.format("y")}
          onChange={e => setYear(parseInt(e.target.value))}
          onDoubleClick={() => {
            setShowYearInput(false)
          }}
        ></input>
      )
    } else {
      return (
        <div
          onDoubleClick={() => {
            setShowMonthInput(false)
            setShowYearInput(true)
          }}
        >
          {selectedDate.format("y")}
        </div>
      )
    }
  }
  return (
    <div className="calendar-main-container">
      <div className="calendar-header-container">
        <h1>Calendar</h1>
      </div>
      <div className="calendar-detail-container">
        {renderMonthInput()}
        {renderYearInput()}
      </div>
      <table className="calendar-table-container">
        <thead>
          <tr className="calendar-table-row-container">
            {moment.weekdaysShort().map(day => {
              cellNumber++
              return (
                <th
                  className="calendar-table-cell-container"
                  key={cellNumber}
                  id={"day-" + cellNumber}
                >
                  {day}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody className="calendar-table-body-container">{completeTable}</tbody>
      </table>
      <div className="calendar-detail-container">
        <div
          className="calendar-table-cell-container"
          onClick={() => {
            setYear(Number(selectedDate.format("Y")) - 1)
          }}
        >
          <span className="material-symbols-outlined">keyboard_double_arrow_left</span>
        </div>
        <div
          className="calendar-table-cell-container"
          onClick={() => {
            setMonth(selectedDate.format("M") - 2)
          }}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </div>
        <div
          className="calendar-table-cell-container"
          onClick={() => {
            setMonth(selectedDate.format("M"))
          }}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
        <div
          className="calendar-table-cell-container"
          onClick={() => {
            setYear(Number(selectedDate.format("Y")) + 1)
          }}
        >
          <span className="material-symbols-outlined">keyboard_double_arrow_right</span>
        </div>
      </div>
    </div>
  )
}

export default App
