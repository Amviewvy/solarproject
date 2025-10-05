import React from "react";

interface GreenGlowButtonProps {
  onClick?: () => void;
  size?: number;
}

const GreenGlowButton: React.FC<GreenGlowButtonProps> = ({
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
        animation: "pulseGreen 2s infinite",
      }}
    >
      <style>
        {`
          @keyframes pulseGreen {
            0% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(126, 255, 0, 0.7);
              filter: brightness(1);
            }
            
            50% {
              transform: scale(1.15);
              filter: brightness(1.2);
              box-shadow: 0 0 0 5px rgba(126, 255, 0, 0.4);
            }
            
            70% {
              transform: scale(1);
              box-shadow: 0 0 0 10px rgba(126, 255, 0, 0);
            }
            
            100% {
              transform: scale(0.95);
              box-shadow: 0 0 0 0 rgba(126, 255, 0, 0);
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
          background: "#7CE251",
          opacity: 0.5,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: "100%",
          height: "100%",
          background: "#8FD14F",
          opacity: 0.2,
          boxShadow: `0 0 ${size * 0.8}px #7EFF00`,
        }}
      />
      <div
        style={{
          ...glowStyle,
          width: size * 0.55,
          height: size * 0.55,
          top: size * 0.225,
          left: size * 0.225,
          background: "#8FD14F",
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
          background: "#7EFF00",
          boxShadow: `0 0 ${size * 0.4}px #7EFF00`,
        }}
      />
    </button>
  );
};

export default GreenGlowButton;