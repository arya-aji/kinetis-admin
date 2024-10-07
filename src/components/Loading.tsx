// src/components/Loading.tsx
import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white flex-col"> {/* Add flex-col for vertical alignment */}
            <img
                src="/images/logo-color.png" // Directly reference the image
                alt="Loading..."
                className="w-auto h-32 object-contain animate-pulse" // Prevent stretching
            />
            <br /> {/* Line break after the logo */}
            <span className="text-lg">Loading....</span> {/* Adjust spacing if needed */}
        </div>
    );
};

export default Loading;
