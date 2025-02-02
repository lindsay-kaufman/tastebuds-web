import "./sidebar.css"
import { useState} from "react";
import classNames from 'classnames';
import doubleArrow from './assets/double-arrow-icon.png'

export const Sidebar = () => {
    const [isExpanded, setExpanded] = useState(false);


    const sidebarWrapperClasses = classNames(
        "sidebar",
        {
            "sidebar-expanded": isExpanded,
        }
    )

    return (
        <div className={sidebarWrapperClasses}>
            <div className="sidebar-expander" onClick={() => setExpanded(!isExpanded)}>
                <img src={doubleArrow} alt="sidebar arrow"/>
            </div>
            <h2>Recent Locations</h2>
            <ul>
                <li>📍 Boston, MA</li>
                <li>📍 New York, NY</li>
                <li>📍 San Francisco, CA</li>
                <li>📍 Denver, CO</li>
                <li>📍 Austin, TX</li>
            </ul>
            <button className="action-button">Show More</button>
        </div>
    )
}
