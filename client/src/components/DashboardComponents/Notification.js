import React from 'react';
import { Fragment } from 'react';
import './notification.css';

const Notification = (props) => {
    
    return (
        <Fragment>
            <div className="box">
                <ul>
                    <li>
                        <div className="notice">
                            <div className="author">{props.author}</div>
                            <div className="timestamp">{props.timestamp}</div>
                            <b>{props.title}</b>
                        </div>
                    </li>
                </ul>
            </div>
        </Fragment>
    );
};

export default Notification;