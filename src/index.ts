import app from 'src/app';
import { Logger } from '@logger/logger';

const port = 8000;
app.listen(port, () => {
  Logger.success('Server started');
});
