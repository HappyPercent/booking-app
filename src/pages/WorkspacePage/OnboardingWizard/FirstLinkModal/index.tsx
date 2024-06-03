import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { IFirstLinkModalProps } from './types';

export const FirstLinkModal = ({ open, link, onClose }: IFirstLinkModalProps) => {
	return (
		<Dialog open={open} maxWidth={'sm'} onClose={onClose}>
			<DialogTitle>First link created!</DialogTitle>
			<DialogContent>You can copy this link to your desk and send it to your clients to book an available slot for your service.</DialogContent>
			<Stack
				spacing={2}
				direction='row'
				display={'flex'}
				justifyContent='space-between'
				alignItems={'center'}
				marginRight={3}
				marginLeft={3}
				paddingLeft={1}
				paddingRight={1}
				sx={({ palette }) => ({
					backgroundColor: palette.custom['light-orange'],
					borderRadius: '6px',
				})}
			>
				<Typography>{link}</Typography>
				<Button
					color='secondary'
					size='small'
					variant='text'
					sx={{ textTransform: 'none', alignSelf: 'flex-start', fontSize: '16px', fontWeight: 600 }}
				>
					Copy link
				</Button>
			</Stack>
			<DialogActions
				sx={{
					margin: '20px',
				}}
			>
				<Button disableElevation color='primary' variant='contained' sx={{ textTransform: 'none' }}>
					Done
				</Button>
			</DialogActions>
		</Dialog>
	);
};
