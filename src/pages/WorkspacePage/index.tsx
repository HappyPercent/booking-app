import { Box, CircularProgress } from '@mui/material';
import { useGetServices } from '../../core/hooks/useGetServices';
import { useGetDesks } from '../../core/hooks/useGetDesks';
import { OnboardingWizard } from './OnboardingWizard';

export const WorkspacePage = () => {
	const { data: services, isLoading: isServicesLoading } = useGetServices();
	const { data: desks, isLoading: isDesksLoading } = useGetDesks();

	if (isDesksLoading || isServicesLoading) return <CircularProgress />;

	if (!desks?.length || !services?.length) return <OnboardingWizard />;

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				alignContent: 'center',
				justifyContent: 'center',
				flexGrow: 1,
			}}
		></Box>
	);
};
