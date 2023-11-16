import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email('Email must be valid!'),
	password: z.string(),
});

export default loginSchema;
