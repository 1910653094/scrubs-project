import './Input.scss';

const Input = ({ title, placeholder, value, onChange, type, errorMessage }) => {
	return (
		<div className='custom-input'>
			<div className='input-title'>{title}</div>
			<input
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
			{errorMessage && <div className='error'>{errorMessage}</div>}
		</div>
	);
};

export default Input;
