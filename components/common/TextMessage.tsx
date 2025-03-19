import React from "react";

interface TextMessageProps {
    text: string
};

const TextMessage: React.FC<TextMessageProps> = ({ text }) => {
    return (
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
    )
};

export default TextMessage;
