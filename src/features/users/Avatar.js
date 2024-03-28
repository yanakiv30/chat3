function Avatar({ name }) {
  const firstLetter = name[0].toUpperCase();
  return <div className="avatar">{firstLetter}</div>;
}

export default Avatar;
