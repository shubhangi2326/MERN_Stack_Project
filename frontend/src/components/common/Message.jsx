// src/components/common/Message.jsx

import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant = 'info', children, onClose }) => {
    return (
        <Alert 
            variant={variant} 
            onClose={onClose} 
            dismissible={!!onClose}
            className="mb-0" 
        >
            {children}
        </Alert>
    );
};

export default Message;