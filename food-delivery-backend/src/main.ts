import express from 'express';
import { register, login } from './presentation/user/controllers/UserController';
import { registerValidation, loginValidation } from './presentation/user/dtos/UserDTO';
import { validationResult } from 'express-validator';

const app = express();
app.use(express.json());

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  next();
}

app.post('/register', registerValidation, validate, register);
app.post('/login', loginValidation, validate, login);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
