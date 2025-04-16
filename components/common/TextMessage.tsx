import React from "react";

interface TextMessageProps {
    text: string
};

const TextMessage: React.FC<TextMessageProps> = ({ text }) => {
    return (
        <p className="text-xs md:text-sm" dangerouslySetInnerHTML={{ __html: text }}></p>
    )
};

export default TextMessage;
