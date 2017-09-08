/**
 * xzqin
 * Created by Administrator on 2017/1/17.
 */
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import routes from './containers/routes';
import '../css/crm.entry.less';

const Root = ({ store, history }) => (
	<Provider store={store}>
		<Router history={history} routes={routes} />
	</Provider>
);

export default Root