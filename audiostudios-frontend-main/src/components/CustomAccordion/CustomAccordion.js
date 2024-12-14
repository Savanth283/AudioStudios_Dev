'use client'
import React, { useState, useRef } from "react";
import { FaAngleDown } from "react-icons/fa";
import { LiaAngleDownSolid } from 'react-icons/lib'

const CustomAccordion = (props) => {
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");
  const [setRotate, setRotateState] = useState("accordion__icon");

  const content = useRef(null);

  function toggleAccordion() {
    setActiveState(setActive === "" ? "active" : "");
    setHeightState(
      setActive === "active" ? "0px" : `${content.current.scrollHeight}px`
    );
    setRotateState(
      setActive === "active" ? "accordion__icon" : "accordion__icon rotate"
    );
  }

  return (
    <div className="accordion__section faq border border-border-color rounded-lg mb-3">
      <button className={`accordion ${setActive}`} onClick={toggleAccordion}>
        <p className="accordion__title">{props.title}</p>
        <FaAngleDown className={`${setRotate} `}/>
      </button>
      <div
        ref={content}
        style={{ maxHeight: `${setHeight}` }}
        className="accordion__content"
      >
        <div
          className="accordion__text pt-3 pb-4 text-gray-800"
          dangerouslySetInnerHTML={{ __html: props.content }}
        /> 
      </div>
    </div>
  );
}

export default CustomAccordion;
