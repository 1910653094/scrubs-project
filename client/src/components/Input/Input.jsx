import "./Input.scss";

const Input = ({
  title,
  placeholder,
  value,
  onChange,
  type,
  errorMessage,
  maxWidth = 320,
}) => {
  return (
    <div className="custom-input" style={{ maxWidth: maxWidth }}>
      {title && <div className="input-title">{title}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );

};

export default Input;
