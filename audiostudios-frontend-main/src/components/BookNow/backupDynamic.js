import React, { useState,useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs' 
import axios from 'axios';
import moment from 'moment';






const DynamicForm = () => {

  // Get today's date in the format "YYYY-MM-DD"
  const today = new Date().toISOString().split('T')[0];


  const [formFields, setFormFields] = useState([{ startTime: '', duration: [] }]);

  const handleAddField = () => {
    const newField = { startTime: '', duration: [] };
    setFormFields([...formFields, newField]);
    //getSlots();
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
  };

  const handleDateChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setFormFields(updatedFields);
    getSlots();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // You can perform further actions with the form data here
    console.log(formFields);
  };

  useEffect(() => {
    getSlots(); // Call the getSlots function when the component is mounted
  }, []); // Empty dependency array ensures the effect runs only once


  const [slots,setSlots] = useState([])

  const getSlots = () => {
    try { 
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list?user_id=nqAjL3bDQRKxHMGX9&date=2023-06-20`).then((response) => {
        setSlots(response.data);
      });
      console.log("")
    } catch (error) {
      console.log(error.response)
    }
  }
    //console.log("avalableSlots",slots.data)


  // const [selectedSlot, setSelectedSlot] = useState([]);
  // const handleSelectedSlot = (e) => {
  //   const { value, checked } = e.target;
  //   if (checked) {
  //     setSelectedSlot([...selectedSlot, value]);
  //   } else {
  //     setSelectedSlot(selectedSlot.filter((checkbox) => checkbox !== value));
  //   }
  // }
    

  //console.log("selectedSlot",selectedSlot)


  const handleSlotChange = (parentIndex, event) => {
    const updatedFields = [...formFields];
    const slotId = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      updatedFields[parentIndex].duration.push(slotId);
    } else {
      const slotIndex = updatedFields[parentIndex].duration.indexOf(slotId);
      if (slotIndex > -1) {
        updatedFields[parentIndex].duration.splice(slotIndex, 1);
      }
    }

    setFormFields(updatedFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, parentIndex) => (
        <div key={parentIndex} className="mt-4 flex">
          <div className="border border-gray-200 bg-gray-50 p-3 p-sm-4 w-[calc(100%-50px)] rounded-md"> 
            <div className="bg-_teal sm:p-2 text-white rounded-lg flex justify-between items-center font-semibold mb-3">
              <input
                type="date"
                name="startTime"
                value={field.startTime}
                onChange={(event) => {
                  handleDateChange(parentIndex, event);
                }}
                min={today}
                placeholder="Start Time"
                className="text-sm sm:text-base w-full h-12 bg-transparent text-white border-0 outline-0 focus:outline-0 focus:ring-0"
              /> 
            </div>
            <div className="p-3 p-sm-4 rounded-lg bg-_gray-light flex flex-wrap">

            {slots.length != 0 && slots.data.map((slot)=> {
              return (
              <div key={slot._id} className="check__group inline-flex mr-4 my-1 sm:my-2">
                <input 
                  onChange={(event) => handleSlotChange(parentIndex, event)}
                 type="checkbox" value={slot._id} name={`duration_${parentIndex}`}  id={slot._id}  />
                <label htmlFor={slot._id} className='label'>{slot.start_time} - {slot.end_time}</label>
              </div>
              )
            })}

              

            </div>
            {/* <div className="p-3 p-sm-4 rounded-lg bg-_gray-light flex flex-wrap justify-between items-center">
              <p className='text-sm sm:text-base md:text-lg font-semibold text-_dark mb-2'>Total Hours:</p>
                <input
                  type="text"
                  name="duration"
                  value={field.duration}
                  onChange={(event) => handleChange(index, event)}
                  placeholder="Duration"
                  className="text-sm sm:text-base w-[150px] h-9 bg-transparent text-_dark border border-border-color outline-0 focus:outline-0 focus:ring-0"
                />
            </div> */}
          </div>
          <div className="w-[50px] pl-2">
            {parentIndex === formFields.length - 1 && (
              <div className="flex justify-center">
                <button 
                  type="button" 
                  onClick={handleAddField}
                  className='text-sm p-2 rounded-md bg-_green text-white font-medium'
                >
                  Add
                </button>
              </div>
            )}
            {parentIndex !== formFields.length - 1 && (
                <div className="text-center">
                  <button 
                    type="button" 
                    onClick={() => handleRemoveField(parentIndex)}
                    className='text-xl text-red-600'
                  >
                    <AiOutlineMinusCircle/>
                  </button>
                </div> 
            )}

          </div>
        </div>
      ))}
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicForm;
