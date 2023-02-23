import React from 'react';

interface MarkerProps {
  text: string;
  color: string;
  show: boolean;
}

export const Marker = ({ text, color, show }: MarkerProps) => {
  return show ? (
    <div
      style={{
        position: 'relative',
        top: '-20px',
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        transition: 'top 0.3s',
        color: color,
      }}
    >
      <h1
        style={{
          backgroundColor: 'white',
          padding: '4px 8px',
          borderRadius: '4px',
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
          position: 'absolute',
          margin: 0,
        }}
      >
        {text}
      </h1>
    </div>
  ) : null;
};
