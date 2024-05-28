import { useState } from 'react';
import { Stepper } from './Stepper';
import { Container, Stack } from '@mui/material';
import { CreateServiceStep } from './CreateServiceStep';

export const OnboardingWizard = () => {
	const [step, setStep] = useState<number>(1);

	return (
		<Container
			maxWidth='md'
			sx={{
				pt: 5,
			}}
		>
			<Stack spacing={4}>
				<Stepper step={step} />
				{step === 1 && <CreateServiceStep onSubmit={() => setStep(2)} />}
			</Stack>
		</Container>
	);
};
