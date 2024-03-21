import { IPricePack } from '../../core/constants/types';

export interface ISelectedPricePack {
	deskId: number;
	proposalId: number;
	pricePack: Partial<IPricePack>;
}
