"use client"

import React, { useState } from 'react';

export default function CheckboxButton({text}){
  const [checked, setChecked] = useState(false);

  const toggleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <button
      type="button"
      className={`border-2 rounded-lg px-4 py-2 focus:outline-none ${
        checked
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-transparent text-blue-500 border-blue-500'
      }`}
      onClick={toggleCheckbox}
    >
      {text}
    </button>
  );
};