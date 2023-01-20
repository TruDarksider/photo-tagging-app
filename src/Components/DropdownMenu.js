import React, { useRef } from "react";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import '../App.css'

const DropdownMenu = () => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
    

    return(
        <div className='menu-container'>
            <button onClick={onClick} className='menu-trigger'>I am Dropdown</button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                    <li>Colby 1</li>
                    <li>Colby 2</li>
                    <li>Colby 3</li>
                </ul>
            </nav>
        </div>
    );
};

export default DropdownMenu;