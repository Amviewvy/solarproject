import React from "react";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="bg-orange-550 text-[#f5f5f5] px-4 py-2 mt-10">
      <h1 className="text-4xl font-semibold">{title}</h1>
    </div>
  );
};

export default Header;
