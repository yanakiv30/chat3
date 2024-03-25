function Avatar({ name }) {
    // Вземаме първата буква от името
    const firstLetter = name.charAt(0).toUpperCase();
  
    return (
      <div className="avatar">
        {firstLetter}
      </div>
    );
  }
  
  export default Avatar;