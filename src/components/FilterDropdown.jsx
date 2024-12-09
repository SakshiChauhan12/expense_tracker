
import React, { useState } from 'react';

const FilterDropdown = ({
  allOptions,
  selectedOptions,
  onSelectOption,
  onDeselectOption,
  resetSelection,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option) => {
    selectedOptions.includes(option) ? onDeselectOption(option) : onSelectOption(option);
  };

  const handleReset = () => resetSelection();

  return (
    <div className="relative">
      {/* Dropdown Toggle Button */}
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="dropdown-content"
      >
        {selectedOptions?.length > 0 ? `Selected: ${selectedOptions.length}` : 'Select options'}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <div
          className="absolute mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-300 max-h-60 overflow-y-auto"
          id="dropdown-content"
        >
          <ul className="divide-y divide-gray-200">
            {allOptions.map((option, index) => (
              <li
                key={index}
                className="flex items-center space-x-2 p-2 cursor-pointer hover:bg-indigo-100"
                onClick={() => handleOptionClick(option)}
              >
                <input
                  type="checkbox"
                  id={`option-${index}`}
                  checked={selectedOptions?.includes(option)}
                  readOnly
                  aria-checked={selectedOptions?.includes(option)}
                  className="w-4 h-4"
                />
                <label htmlFor={`option-${index}`} className="text-sm">{option}</label>
              </li>
            ))}
          </ul>
          {/* Reset Button */}
          <button
            className="w-full bg-red-500 text-white py-2 rounded-b-md hover:bg-red-400 focus:outline-none"
            onClick={handleReset}
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
