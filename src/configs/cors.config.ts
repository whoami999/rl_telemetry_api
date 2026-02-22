export const corsOptions = {
  origin: 'http://localhost:4200', // Allow only this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'], // Allow specified methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow specified headers
  credentials: false // If you need to handle cookies or authentication headers
};