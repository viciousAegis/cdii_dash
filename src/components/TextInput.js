// components/TextInput.js

import React from 'react';

const TextInput = ({ placeholder, onChange, value }) => {
    return (
        <input
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={value}
            className="w-3/4 border border-gray-300 p-2 rounded-md focus:outline-none focus:border-blue-500 m-0"
        />
    );
};

export default TextInput;