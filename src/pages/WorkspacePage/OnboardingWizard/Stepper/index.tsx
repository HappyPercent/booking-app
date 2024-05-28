import { Stepper as MuiStepper, Stack, Step, StepConnector, Typography, stepConnectorClasses, styled } from '@mui/material';
import { IStepperProps } from './types';

const QontoConnector = styled(StepConnector)(({ theme }) => ({
	[`&.${stepConnectorClasses.active}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.custom['primary-orange'],
		},
	},
	[`&.${stepConnectorClasses.completed}`]: {
		[`& .${stepConnectorClasses.line}`]: {
			borderColor: theme.palette.custom['primary-orange'],
		},
	},
	[`& .${stepConnectorClasses.line}`]: {
		borderColor: theme.palette.custom['light-grey'],
		borderTopWidth: 6,
		borderRadius: 3,
	},
}));

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export const Stepper = ({ step }: IStepperProps) => {
	return (
		<Stack spacing={1}>
			<Typography color={({ palette }) => palette.custom['mid-grey']} variant='body2'>
				Step {step} of 2
			</Typography>
			<MuiStepper
				activeStep={step}
				connector={<QontoConnector />}
				sx={{
					'& .MuiStep-root': {
						display: 'none',
					},
					display: 'flex',
					gap: '8px',
				}}
			>
				{steps.map((label) => (
					<Step
						key={label}
						sx={{
							width: '100px',
						}}
					/>
				))}
			</MuiStepper>
		</Stack>
	);
};
