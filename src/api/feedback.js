import { httpCreate } from './http';

const http = httpCreate('/api/feedback');

export const feedback = {
	sendFeedback(userId, data) {
		return http.post(`/sendFeedback?userId=${userId}`, data);
	}
};
