import React, { useState, useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';
import axios from 'axios';

const DynamicForm = ({id}) => {
  const currentDate = new Date().toISOString().split('T')[0];

  const [formFields, setFormFields] = useState([{ startTime: '', durations: [] }]);
  const [slots, setSlots] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    if (formFields.length > 0) {
      const dates = formFields.map((field) => field.startTime);
      getSlots(dates);
    }
  }, [formFields]);

  const getSlots = async (dates) => {
    try {
      const response = await Promise.all(
        dates.map((date) =>
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list?creator_studio_id=${id}&date=${date}`)
        )
      );
      const slotData = response.map((res) => res.data.data);
      
      setSlots(slotData);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };
  
  const handleAddField = () => {
    const allFieldsValid = formFields.every((field) => field.startTime && field.durations.length > 0);
  
    if (allFieldsValid) {
      const newField = { startTime: '', durations: [] };
      setFormFields([...formFields, newField]);
      setErrorMessages([]);
    } else {
      const fieldErrors = formFields.map((field) => {
        if (!field.startTime) {
          return 'Please select a date';
        } else if (field.durations.length === 0) {
          return 'Please select a slot';
        } else {
          return '';
        }
      });
      setErrorMessages(fieldErrors);
    }
  };
  
  

  const handleRemoveField = (index) => {
    const updatedFields = [...formFields];
    updatedFields.splice(index, 1);
    setFormFields(updatedFields);
    setErrorMessages([]);
  };

  const handleDateChange = async (index, event) => {
    const { name, value } = event.target;
  
    // Check if the selected date is already chosen in other fields
    const isDuplicateDate = formFields.some((field, idx) => idx !== index && field.startTime === value);
    if (isDuplicateDate) {
      setErrorMessages((prevErrors) => {
        const updatedErrors = [...prevErrors];
        updatedErrors[index] = 'Date already selected in another field';
        return updatedErrors;
      });
      return;
    }
  
    const updatedFields = [...formFields];
    updatedFields[index] = { ...updatedFields[index], [name]: value };
    setFormFields(updatedFields);
  
    const dates = updatedFields.map((field) => field.startTime);
    const slotResponses = await Promise.all(
      dates.map((date) =>
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list?creator_studio_id=${id}&date=${date}`)
      )
    );
    const slotData = slotResponses.map((res) => res.data.data);
  
    setSlots(slotData);
  
    setErrorMessages((prevErrors) => {
      const updatedErrors = [...prevErrors];
      const slotsAvailable = slotData[index].length > 0;
      updatedErrors[index] = slotsAvailable ? '' : 'No slots available for the selected date';
      return updatedErrors;
    });
  };
  

  

  const handleSlotChange = (parentIndex, event) => {
    const { value, checked } = event.target;
    const updatedFields = [...formFields];
    const selectedDurations = [...updatedFields[parentIndex].durations];

    if (checked) {
      selectedDurations.push(value);
    } else {
      const index = selectedDurations.indexOf(value);
      if (index > -1) {
        selectedDurations.splice(index, 1);
      }
    }

    updatedFields[parentIndex] = { ...updatedFields[parentIndex], durations: selectedDurations };
    setFormFields(updatedFields);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formFields);
  };

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
                onChange={(event) => handleDateChange(parentIndex, event)}
                min={currentDate}
                placeholder="Start Time"
                className="text-sm sm:text-base w-full h-12 bg-transparent text-white border-0 outline-0 focus:outline-0 focus:ring-0"
              />
            </div>
            {field.startTime && slots[parentIndex] && (
              <div className="p-3 p-sm-4 rounded-lg bg-_gray-light flex flex-wrap">
                {slots[parentIndex].map((slot) => (
                  <div key={slot._id} className="check__group inline-flex mr-4 my-1 sm:my-2">
                    <input
                      onChange={(event) => handleSlotChange(parentIndex, event)}
                      type="checkbox"
                      value={slot._id}
                      name={`durations_${parentIndex}`}
                      id={slot._id}
                      checked={field.durations.includes(slot._id)}
                      disabled={slot.booking_status !== 'Available'}
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
