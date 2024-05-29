import { useState } from 'react';
import { Stepper } from './Stepper';
import { Container, Stack } from '@mui/material';
import { ServiceForm } from '../../../core/components/ServiceForm';
import { DeskForm } from '../../../core/components/DeskForm';
import { INewServiceFormData } from '../../../core/components/ServiceForm/types';

export const OnboardingWizard = () => {
	const [step, setStep] = useState<number>(1);
	const [wizardData, setWizardData] = useState<{ service?: INewServiceFormData }>({});
	console.log('wizardData: ', wizardData);

	const handleServiceFormSubmit = (values: INewServiceFormData) => {
		setWizardData((state) => ({ ...state, service: values }));
		setStep(2);
	};

	const handleDeskFormSubmit = () => {
		console.log('Desk form submitted');
	};

	return (
		<Container
			maxWidth='md'
			sx={{
				pt: 5,
			}}
		>
			<Stack spacing={4}>
				<Stepper step={step} />
				{step === 1 && <ServiceForm onSubmit={handleServiceFormSubmit} mode='create' defaultValues={wizardData.service} />}
				{step === 2 && (
					<DeskForm
						onBack={() => setStep(1)}
						onSubmit={handleDeskFormSubmit}
						mode='create'
						linkedServices={wizardData.service ? [wizardData.service] : []}
					/>
				)}
			</Stack>
		</Container>
	);
};
