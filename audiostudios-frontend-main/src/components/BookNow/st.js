import React, { useState, useEffect } from 'react';
import { AiOutlineMinusCircle } from 'react-icons/ai';
import { BsFillClockFill } from 'react-icons/bs';
import axios from 'axios';

const DynamicForm = () => {
  const [formFields, setFormFields] = useState([{ startTime: '', duration: [] }]);
  const [selectedDates, setSelectedDates] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);
  const [slots, setSlots] = useState([]);

  const currentDate = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (selectedDates.length > 0) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booking-list`, {
            params: {
              user_id: 'nqAjL3bDQRKxHMGX9',
              dates: selectedDates.join(','),
            },
          });
          setSlots(response.data);
        } catch (error) {
          console.error('Error fetching slots:', error);
        }
      };
  
      fetchData();
    } else {
      setSlots([]);
    }
  }, [selectedDates]);

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
    }
  };

  const handleSlotChange = (parentIndex, event) => {
    const { value, checked } = event.target;
    const updatedFields = [...formFields];
    const selectedField = updatedFields[parentIndex];
  
    if (checked) {
      selectedField.duration.push(value);
    } else {
      selectedField.duration = selectedField.duration.filter((slotId) => slotId !== value);
    }
  
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
            {field.startTime && slots.length > 0 && (
  <div className="p-3 p-sm-4 rounded-lg bg-_gray-light flex flex-wrap">
    {slots.map((slot) => (
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
          {slot.start_time} - {slot.end_time}
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
