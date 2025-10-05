import React from "react";

interface OrangeGlowButtonProps {
  onClick?: () => void;
  size?: number;
}

const OrangeGlowButton: React.FC<OrangeGlowButtonProps> = ({
  onClick,
  size = 36,
}) => {
  const glowStyle: React.CSSProperties = {
    position: "absolute",
    borderRadius: "50%",
    top: 0,
    left: 0,
  };

  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        position: "relative",
        borderRadius: "50%",
        border: "none",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        outline: "none",
        animation: "pulseOrange 2s infinite",
      }}
    >
      <style>
        {`
          @keyframes pulseOrange {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.7);
              filter: brightness(1);
            }
            
            50% {
              transform: scale(1.15);
              filter: brightness(1.2);
              box-shadow: 0 0 0 5px rgba(255, 102, 0, 0.4);
            }
            
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px rgba(255, 102, 0, 0);
            }
            
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(255, 102, 0, 0);
              filter: brightness(1);
            }
          }
        `}
      </style>

      <div
        style={{
          ...glowStyle,
          width: "100%",
          height: "100%",
          background: "#E29551",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: "100%",
          height: "100%",
          background: "#D1834F",
          opacity: 0.2,
          boxShadow: `0 0 ${size * 0.8}px #FF6600`,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: size * 0.55,
          height: size * 0.55,
          top: size * 0.225,
          left: size * 0.225,
          background: "#D1834F",
          opacity: 0.4,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: size * 0.24,
          height: size * 0.24,
          top: size * 0.38,
          left: size * 0.38,
          background: "#FF6600",
          boxShadow: `0 0 ${size * 0.5}px #FF6600`,
        }}
      />
    </button>
  );
};

export default OrangeGlowButton;