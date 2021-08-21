import 'react-redux';

import { RootState } from 'reducers';

declare module 'react-redux' {
  interface DefaultRootState extends RootState { };
}