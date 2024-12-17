import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const DropdownMenu = ({ button, children, menuWidth=210 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef(null);

  const toggleDropdown = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);

    // Get click position
    const { clientX, clientY } = event;
    const adjustedLeft = clientX + menuWidth > window.innerWidth ? clientX - menuWidth : clientX;

    setPosition({ top: clientY, left: adjustedLeft });
  };

  const handleItemClick = (action) => {
    setIsOpen(false); // Close dropdown after selecting an item
    if (action) action(); // Execute the action if defined
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative inline-block text-left">
      <div onClick={toggleDropdown} className="cursor-pointer">
        {React.cloneElement(button, { onClick: toggleDropdown })} {/* Clone button with onClick */}
      </div>

      {isOpen && ReactDOM.createPortal(
        <div
          ref={menuRef}
          className="absolute z-10 mt-2"
          style={{ top: position.top, left: position.left }}
        >
          <div className="" role="none">
            {React.Children.map(children, (child) => {
              return React.cloneElement(child, {
                onClick: (e) => {
                  e.preventDefault(); // Prevent default anchor behavior
                  handleItemClick(child.props.onClick); // Call the action prop
                },
              });
            })}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default DropdownMenu;
