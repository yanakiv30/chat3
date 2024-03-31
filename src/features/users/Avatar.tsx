interface AvatarProps{name:string}

function Avatar({ name }:AvatarProps) {
  const firstLetter = name[0].toUpperCase();
  return <div className="avatar">{firstLetter}</div>;
}

export default Avatar;



