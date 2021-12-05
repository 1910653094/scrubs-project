import { useEffect, useState, useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from './Modal';
import { getEmployees } from '../../redux/features/employees/employeesSlice';
import { CustomButton, Divider, Input, Select } from '..';
import './Modal.scss';
import { COLORS } from '../../assets';

const generateDateString = (string) => {
	const date = string.split('/');
	return `${date.pop()}-${date.pop()}-${date.pop()}`;
};

const GSModal = ({ closeModal }) => {
	const [selectedEmail, setSelectedEmail] = useState('');
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [selectedColor, setSelectedColor] = useState('');
	const [amount, setAmount] = useState(0);
	const [returnDate, setReturnDate] = useState('yyyy-mm-dd');

	const dispatch = useDispatch();
	const { data, isLoading, error } = useSelector(({ employees }) => employees);

	useEffect(() => {
		if (data.length === 0) {
			dispatch(getEmployees());
		}
	}, []);

	const borrower = useMemo(
		() => data.find((person) => person.email === selectedEmail),
		[data, selectedEmail]
	);

	const submitData = useCallback(() => {
		const today = new Date().toISOString().slice(0, 10);
		console.table({
			...borrower,
			amount,
			selectedColor,
			selectedType,
			selectedSize,
			returnDate,
			today,
		});
	}, [borrower, amount, selectedSize, selectedType, returnDate]);

	return (
		<Modal closeModal={closeModal} title='Give Scrubs to staff member'>
			<Input
				title='Email'
				maxWidth={'100%'}
				placeholder='Start writing their email'
				list='emails'
				onChange={(e) => setSelectedEmail(e.target.value)}
			/>
			<datalist id='emails'>
				{data &&
					data.map((emp) => <option value={emp.email}>{emp.email}</option>)}
			</datalist>

			{borrower && (
				<>
					<Divider />
					<div className='borrower-info-inputs'>
						<Input
							title='Full Name'
							type='text'
							value={borrower.name}
							style={{
								flex: 1,
							}}
						/>
						<Input
							title='Profession'
							type='text'
							value={borrower.profession}
							maxWidth='100px'
						/>
						<Input
							title='Gender'
							type='text'
							value={borrower.gender}
							maxWidth='100px'
						/>
					</div>
					<Divider />
					<div className='borrow-item'>
						<div className='row-1'>
							<Select
								title='Scrub Type'
								selectedValue={selectedType}
								options={['Top', 'Bottom', 'Shoes', 'Gloves']}
								onChange={(e) => setSelectedType(e.target.value)}
							/>
							<Select
								title='Size'
								selectedValue={selectedSize}
								maxWidth='100px'
								options={['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']}
								onChange={(e) => setSelectedSize(e.target.value)}
							/>
							<Select
								title='Color'
								selectedValue={selectedColor}
								maxWidth='100px'
								options={['Red', 'Blue', 'White']}
								onChange={(e) => setSelectedColor(e.target.value)}
							/>
						</div>
						<div className='row-2'>
							<Input
								type='number'
								title='Amount'
								value={amount}
								maxWidth='80px'
								onChange={(e) => setAmount(e.target.value)}
							/>
							<Input
								type='date'
								title='Return by'
								value={returnDate}
								onChange={(e) => setReturnDate(e.target.value)}
							/>
						</div>
					</div>
					<Divider />
					<div className='actions'>
						<CustomButton
							textColor={COLORS.genericRed}
							type='tertiary'
							text='Cancel'
							onClick={() => closeModal()}
						/>
						<CustomButton
							textColor={COLORS.genericRed}
							type='primary'
							text='Give'
							onClick={() => submitData()}
						/>
					</div>
				</>
			)}
		</Modal>
	);
};

export default GSModal;
