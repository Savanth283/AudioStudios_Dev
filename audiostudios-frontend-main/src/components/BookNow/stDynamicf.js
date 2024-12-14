import React, { useState, useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';
import axios from 'axios';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([{ startTime: '', duration: [] }]);
  const [slots, setSlots] = useState([]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  const currentDate = new Date().toISOString().split('T')[0];

  // useEffect(() => {
  //   getSlots();
  // }, []);

  const getSlots = async (value) => {
    //console.log("value",value)
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list?user_id=nqAjL3bDQRKxHMGX9&date=${value}`);
      setSlots(response.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleAddField = () => {
    const newField = { startTime: '', duration: [] };
    if (formFields.length === 0) {
      const currentDate = new Date().toISOString().split('T')[0];
      newField.startTime = currentDate;
    }
    setFormFields([...formFields, newField]);
  };
  
  

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
    setSelectedDates(selectedDates.filter((date) => date !== formFields[index].startTime));
    setErrorMessages([]);
  };

  const handleDateChange = (index, event) => {
    const { name, value } = event.target;
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };

    if (selectedDates.includes(value)) {
      setErrorMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = 'This date has already been chosen. Please select a different date.';
        return updatedMessages;
      });
    } else {
      setErrorMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[index] = '';
        return updatedMessages;
      });
      setFormFields(updatedFields);
      setSelectedDates([...selectedDates, value]);
      getSlots(value);
    }
  };

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);
  };
  //console.log("selectedDates",selectedDates)
  return (
    <form onSubmit={handleSubmit}>
      {formFields.map((field, parentIndex) => (
        <div key={parentIndex} className="mt-4 flex">
          <div className="border border-gray-200 bg-gray-50 p-3 p-sm-4 w-[calc(100%-50px)] rounded-md">
            <div className="bg-_teal sm:p-2 text-white rounded-lg flex justify-between items-center mb-3">
              <input
                type="date"
                name="startTime"
                value={field.startTime}
                // {if (parentIndex == 0) ? value={field.startTime} : value={currentDate} }
                onChange={(event) => handleDateChange(parentIndex, event)}
                min={currentDate}
                placeholder="Start Time"
                className="text-sm sm:text-base w-full h-12 bg-transparent text-white border-0 outline-0 focus:outline-0 focus:ring-0"
              />
            </div>
            {field.startTime && (
              <div className="p-3 p-sm-4 rounded-lg bg-_gray-light flex flex-wrap">
                {slots.data &&
                  slots.data.map((slot) => (
                    <div key={slot._id} className="check__group inline-flex mr-4 my-1 sm:my-2">
                      <input
                        onChange={(event) => handleSlotChange(parentIndex, event)}
                        type="checkbox"
                        value={slot._id}
                        name={`duration_${parentIndex}`}
                        id={slot._id}
                        checked={field.duration.includes(slot._id)}
                      />
                      <label htmlFor={slot._id} className="label">
                        {slot.start_time} - {slot.end_time} {slot._id}
                      </label>
                    </div>
                  ))}
              </div>
            )}
            {errorMessages[parentIndex] && (
              <p className="text-red-500 text-sm mt-2">{errorMessages[parentIndex]}</p>
            )}
          </div>
          <div className="w-[50px] pl-2">
            {parentIndex === formFields.length - 1 ? (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddField}
                  className="text-sm p-2 rounded-md bg-_green text-white font-medium"
                >
                  Add
                </button>
              </div>
            ) : (
              <div className="text-center">
                <button type="button" onClick={() => handleRemoveField(parentIndex)} className="text-xl text-red-600">
                  <AiOutlineMinusCircle />
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
