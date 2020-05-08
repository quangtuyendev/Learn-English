import PropTypes from 'prop-types';
import React from 'react';
import AuthProvider from './auth';
import EditItemProvider from './editItem';
import LoadingProvider from './loading';
import ModalProvider from './modal';
import UserProvider from './user';
import WordProvider from './word';

RootProvider.propTypes = {
  children: PropTypes.object.isRequired,
};

export default function RootProvider({ children }) {
  return (
    <UserProvider>
      <AuthProvider>
        <WordProvider>
          <ModalProvider>
            <EditItemProvider>
              <LoadingProvider>{children}</LoadingProvider>
            </EditItemProvider>
          </ModalProvider>
        </WordProvider>
      </AuthProvider>
    </UserProvider>
  );
}
