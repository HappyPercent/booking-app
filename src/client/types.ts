export type BackendResponse<D> = {
	data: { content: D } | null;
	message: string;
};
