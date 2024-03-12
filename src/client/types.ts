export type BackendResponse<D> = {
	data: { content: D };
	message: string;
};
