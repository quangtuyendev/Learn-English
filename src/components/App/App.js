import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getUsers } from '../../api/users';
import { Layout } from '../../commons/Layout/Layout';
import ModalForm from '../../commons/Modal/ModalForm';
import { routes } from '../../constants/routes';
import Loading from '../Loading/Loading';
import Navbar from '../Navbar/Navbar';



export const App = () => {
    const [users, setUsers] = useState([]);
    // fetch users
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getUsers();
                setUsers(res.data);
                console.log(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const renderRoutes = () => (
        _.map(routes, ({ path, exact, component: MyComponent }) => (
            <Route key={path} path={path} exact={exact}>
                <Layout>
                    <Navbar />
                    <Loading />
                    <ModalForm />
                    <MyComponent users={users} />
                </Layout>
            </Route>
        ))
    );

    return (
        <Router>
            <Switch>
                {renderRoutes()}
            </Switch>
            <ToastContainer />
        </Router>
    );
};
