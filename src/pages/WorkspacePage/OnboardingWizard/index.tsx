import { useState } from 'react';
import { Stepper } from './Stepper';
import { Container, Stack } from '@mui/material';
import { ServiceForm } from '../../../core/components/ServiceForm';
import { DeskForm } from '../../../core/components/DeskForm';
import { INewServiceFormData } from '../../../core/components/ServiceForm/types';
import { IDeskFormValues } from '../../../core/components/DeskForm/types';
import { getEvents } from '../../../core/components/DeskForm/helpers/getEvents';
import { useCreateDeskMutation } from '../../../core/hooks/useCreateDeskMutation';
import { useCreateSlotsForDeskMutation } from '../../../core/hooks/useCreateSlotsForDeskMutation';
import { useCreateServiceMutation } from '../../../core/hooks/useCreateServiceMutation';
import { useQueryClient } from '@tanstack/react-query';
import { FirstLinkModal } from './FirstLinkModal';
import { getUser } from '../../../core/helpers/getUser';

export const OnboardingWizard = () => {
	const [step, setStep] = useState<number>(1);
	const user = getUser();
	const [wizardData, setWizardData] = useState<{ service?: INewServiceFormData }>({});
	const queryClient = useQueryClient();
	const [modalData, setModalData] = useState<{ open: boolean; link: string }>({ open: false, link: `` });
	const { mutateAsync: createDesk, isLoading: isCreateDeskLoading } = useCreateDeskMutation();
	const { mutateAsync: createSlotsForDesk, isLoading: isCreateSlotsForDeskLoading } = useCreateSlotsForDeskMutation();

	// TODO: Fix after start storing userId in local storage
	const { mutateAsync: createService, isLoading: isCreateServiceLoading } = useCreateServiceMutation({
		onSuccess: () => setModalData({ open: true, link: `ownerId/${user.id}` }),
	});

	const handleServiceFormSubmit = (values: INewServiceFormData) => {
		setWizardData((state) => ({ ...state, service: values }));
		setStep(2);
	};

	const handleDeskFormSubmit = async (data: IDeskFormValues) => {
		try {
			const schedule = getEvents(data.schedule)?.map((event) => ({
				dateTimeStart: new Date(event.startStr).toISOString(),
				dateTimeEnd: new Date(event.endStr).toISOString(),
			}));
			const desk = await createDesk(data);
			await createSlotsForDesk({ deskId: Number(desk.data.data), schedule });
			await createService(wizardData.service!);
			// TODO: link the service to the desk once the API returns the new service id
		} catch (error) {
			console.error('Onboarding failed', error);
		}
	};

	const onClose = () => {
		setModalData((state) => ({ ...state, open: false }));
		queryClient.invalidateQueries(['services', 'desks']);
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
						isLoading={isCreateDeskLoading || isCreateSlotsForDeskLoading || isCreateServiceLoading}
					/>
				)}
			</Stack>
			<FirstLinkModal open={modalData.open} link={modalData.link} onClose={onClose} />
		</Container>
	);
};
