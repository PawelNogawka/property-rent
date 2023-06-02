import React from "react";

import Image from "next/image";

import "./Avatar.scss";

interface AvatarProps {
  src: string | null;
  name: string | null;
}

const Avatar: React.FC<AvatarProps> = ({ src, name }) => {
  return <Image className="avatar-user" src={src ?? ''} alt={name ?? '' } width={45} height={45}/>;
};


export default Avatar;
