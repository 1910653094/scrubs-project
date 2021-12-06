import { useState, useCallback } from 'react';
import Modal from './Modal';
import { Divider, Select, TextArea, CustomButton, Input } from '..';
import { COLORS } from '../../assets';
import './Modal.scss';

const RModal = ({ closeModal }) => {
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedType, setSelectedType] = useState('');
	const [selectedColor, setSelectedColor] = useState('');
	const [inputGender, setInputGender] = useState('');
	const [reportType, setReportType] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState(0);

	const submitData = useCallback(() => {
		closeModal();
	}, []);

	return (
		<Modal closeModal={closeModal} title='Report Scrubs'>
			<div className='report-inputs'>
				<Select
					title='Scrub Type'
					selectedValue={selectedType}
					options={['Top', 'Bottom', 'Shoes', 'Gloves']}
					maxWidth='150px'
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
					options={['Red', 'Blue', 'White', 'Green']}
					onChange={(e) => setSelectedColor(e.target.value)}
				/>
				<Select
					title='Gender'
					selectedValue={inputGender}
					maxWidth='100px'
					options={['Male', 'Female']}
					onChange={(e) => setInputGender(e.target.value)}
				/>
				<Input
					type='number'
					title='Amount'
					value={amount}
					maxWidth='80px'
					onChange={(e) => setAmount(e.target.value)}
				/>
			</div>
			<Divider />
			<Select
				title='Type of report'
				selectedValue={reportType}
				maxWidth='120px'
				options={['Damage', 'Missing']}
				onChange={(e) => setReportType(e.target.value)}
			/>
			<TextArea
				title='Description'
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				maxWidth='100%'
			/>
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
		</Modal>
	);
};

export default RModal;
