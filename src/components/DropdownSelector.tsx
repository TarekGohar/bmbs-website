"use client";

import { useState, useEffect, useRef } from "react";

interface DropdownSelectorProps {
  name: string;
  placeholder: string;
  options: string[];
  onValueChange?: (key: string, value: string) => void; // Callback function to notify parent component of state change
}

export default function DropdownSelector({
  name,
  placeholder,
  options,
  onValueChange,
}: DropdownSelectorProps) {
  const [isOpen, setIsOpen] = useState(false); // To track if the menu is open
  const [selectedValue, setSelectedValue] = useState(placeholder);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false); // Close the dropdown when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div className="relative rounded-xl w-full" ref={dropdownRef}>
      <input type="hidden" value={selectedValue} name={name} />
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)} // Toggle dropdown open/closed
        className={`w-full px-4 py-3 bg-black border-b-2 font-medium duration-200 ${
          isOpen ? "border-white" : "border-neutral-700"
        }`}
      >
        <div className="flex items-center justify-between space-x-2">
          <h2 className="text-white">{selectedValue}</h2>
          <svg
            className={`w-5 h-5 text-white transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Dropdown Menu: Positioned absolutely, shown only when isOpen is true */}
      {isOpen && (
        <div
          className={
            `absolute mt-2 z-10 w-full bg-black border-b-2 border-gray-200 shadow-lg overflow-hidden overflow-y-auto` +
            (options.length > 4 ? " h-44" : "")
          }
        >
          {options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                setSelectedValue(option);
                if (onValueChange) {
                  onValueChange(name, option); // Notify parent component of the change
                }
                setIsOpen(false); // Close the dropdown after selection
              }}
              className={`block w-full px-4 py-3 text-left text-white hover:bg-neutral-900 active:bg-neutral-200 transition ease-in duration-150`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
