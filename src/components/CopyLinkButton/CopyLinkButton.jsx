import React from 'react';

export function CopyLinkButton({ myUrl, className }) {
    const [isCopied, setIsCopied] = React.useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(myUrl)
            .then(() => {
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500); // Set isCopied back to false after 3 seconds
            })
            .catch(err => console.error('Failed to copy:', err));
    };

    return (
        <button className={className} onClick={handleCopy}>
            {isCopied ? 'Copied!' : 'Copy Link'}
        </button>
    );
}
