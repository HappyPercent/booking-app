import * as Yup from 'yup';

export const schema = Yup.object().shape({
	name: Yup.string().required('Enter a service name'),
	categoryGroupId: Yup.string().required('Select a category'),
	categoryId: Yup.string().required('Select a subcategory'),
	shortDescr: Yup.string(),
	descr: Yup.string(),
	pricePack: Yup.array().of(
		Yup.object().shape({
			duration: Yup.number().required('Enter duration'),
			price: Yup.number().required('Enter a price').min(1, 'Min price - 1'),
			currency: Yup.string().required('Set currency'),
		})
	),
});
