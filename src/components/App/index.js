import _ from 'lodash';
import React, { useContext, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';
import { fetchUserRequest, fetchWordsRequest } from '../../actions';
import { getUsers } from '../../api/users';
import { getItems } from '../../api/words';
import Layout from '../../commons/Layout';
import ModalForm from '../../commons/Modal/ModalForm';
import { ROUTES } from '../../constants/routes';
import { UserContext } from '../../contexts/user';
import { WordContext } from '../../contexts/word';
import Loading from '../Loading/GlobalLoading';
import Navbar from '../Navbar';
import { AuthContext } from '../../contexts/auth';

function App() {
  const [, handleFetchUser] = useContext(UserContext);
  const [, handleFetchWords] = useContext(WordContext);
  const [{ email, isAuthenticated }] = useContext(AuthContext);

  const renderRoutes = () =>
    _.map(ROUTES, ({ path, exact, component: MyComponent }) => (
      <Route key={path} path={path} exact={exact}>
        <Layout>
          <Navbar />
          <Loading />
          <ModalForm />
          <MyComponent />
        </Layout>
      </Route>
    ));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getUsers();
        handleFetchUser(fetchUserRequest(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [handleFetchUser]);

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const { data } = await getItems();
        handleFetchWords(fetchWordsRequest(data));
      } catch (error) {
        console.log(error);
      }
    };
    if (isAuthenticated) {
      fetchWords();
      toast.success(`Welcome ${email}`, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000,
        bodyClassName: css({
          fontSize: '1.6rem',
        }),
      });
    }
  }, [email, isAuthenticated, handleFetchWords]);

  return useMemo(() => {
    return (
      <Router>
        <Switch>{renderRoutes()}</Switch>
        <ToastContainer />
      </Router>
    );
  }, []);
}

export default App;
