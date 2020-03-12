import _ from 'lodash';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { connect } from 'react-redux';

import * as actions from '../../actions/index';
import WordItem from '../../components/WordItem/WordItem';
import { WordsList } from '../../components/WordList/WordList';
import SaveForm from '../../components/Forms/SaveForm';
import { RemoveModal } from '../../commons/Modal/RemoveModal';


const WordsListContainer = props => {
    let {
        fetchItems,
        words, showModal,
        hideModal, saveItem,
        showLoading,
        hideLoading,
        auth,
        fetchItemEdit,
        clearItemEdit,
        editItem,
        removeItem,
        sortItem,
        sortData,
        searchValue,
        searchItem
    } = props;

    const { email, isAuthenticated } = auth;

    useEffect(() => {
        if (isAuthenticated) {
            fetchItems(() => {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                }, 1000);
                toast.success(`Welcome ${email}!`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                    bodyClassName: css({
                        fontSize: '1.6rem'
                    }),
                });
            });
        };
    }, [email, isAuthenticated, fetchItems, hideLoading, showLoading]);
    
    // Handle sort words
    const handleSort = ({ sortBy, sortValue }) => {
        sortItem({ sortBy, sortValue });
    };

    if (sortData) {
        const { sortBy, sortValue } = sortData;
        if (sortBy === 'name') {
            words = words.sort((a, b) => {
                if (a.name < b.name) { return -sortValue; };
                if (a.name > b.name) { return sortValue; };
                return 0;
            });
        } else {
            words = words.sort((a, b) => {
                if (a.date < b.date) { return sortValue; };
                if (a.date > b.date) { return -sortValue; };
                return 0;
            });
        }
    };

    // Handle search words
    const handleSearch = event => {
        const { value } = event.target;
        searchItem(value);
    };

    if (searchValue) {
        words = _.filter(words, word => word.name.toLowerCase().indexOf(searchValue.toLowerCase().trim()) !== -1);
    };

    const renderWords = () => {
        if (!words.length) {
            return (
                <tr className="table-nothing">
                    <td>
                        <img className="loading-image" src={require('../../assets/images/sad-icon.svg')} alt="Sad icon" />
                        <h2>No thing here!</h2>
                    </td>
                </tr>
            );
        } else {
            return (
                _.map(words, word => (
                    <WordItem
                        key={word.id}
                        word={word}
                        handleEditItem={handleEditItem}
                        showDeleteModal={showDeleteModal}
                    />
                ))
            );
        }
    };
    // handle for save item
    const handleSave = value => {
        const { id } = value;
        if (!id) {
            saveItem(value, () => {
                hideModal();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                }, 1000);
                toast.success("App Success !", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    bodyClassName: css({
                        fontSize: '1.6rem'
                    }),
                });
            });
        } else {
            editItem(id, value, () => {
                hideModal();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                }, 1000);
                toast.success("Edit Success !", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    bodyClassName: css({
                        fontSize: '1.6rem'
                    }),
                    className: css({
                        background: 'gold'
                    }),
                });
            });
        }
    };


    // handle show modal to add item
    const showAddModal = () => {
        const modalContent = (
            <SaveForm
                modalTitle="Add a new item"
                hideModal={hideModal}
                handleSave={handleSave}
                saveItem={saveItem}
                hideLoading={hideLoading}
                showLoading={showLoading}
            />
        );
        clearItemEdit();
        showModal(modalContent);
    };

    // handle show modal edit item
    const handleEditItem = value => {
        fetchItemEdit(value);
        const modalContent = (
            <SaveForm
                modalTitle="Update item"
                hideModal={hideModal}
                handleSave={handleSave}
                editItem={editItem}
                showLoading={showLoading}
                hideLoading={hideLoading}
            />
        );
        showModal(modalContent);
    };

    // handle show modal delete item
    const showDeleteModal = ({ name, id }) => {
        const handleDelete = () => {
            removeItem(id, () => {
                hideModal();
                showLoading();
                setTimeout(() => {
                    hideLoading();
                }, 1000);
                toast.error(`Remove ${name} Success!`, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 2000,
                    bodyClassName: css({
                        fontSize: '1.6rem'
                    }),
                });
            });
        };
        const modalContent = (
            <RemoveModal
                name={name}
                id={id}
                handleDelete={handleDelete}
                hideModal={hideModal}
                modalTitle="Remove item"
            />
        );
        showModal(modalContent);
    };

    return (
        isAuthenticated ? <WordsList
            props={{
                ...props,
                showAddModal,
                handleSort,
                handleSearch,
                sortData
            }}>
            {renderWords(words)}
        </WordsList> : (
                <div className="container">
                    <div className="row">
                        <div className="col-12 p-0">
                            <div className="box-welcome d-flex align-items-center">
                                <img className="loading-image" src={require('../../assets/images/welcome.gif')} alt="Welcome Gif" />
                                <h3 className="box-welcome-text">Welcome. Please signin or sign up!</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )
    );
};

const mapStateToProps = state => ({
    words: state.words,
    auth: state.auth,
    modal: state.modal,
    searchValue: state.searchValue,
    sortData: state.sortData
});

WordsListContainer.propTypes = {
    fetchItems: PropTypes.func,
    words: PropTypes.array,
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    saveItem: PropTypes.func,
    showLoading: PropTypes.func,
    hideLoading: PropTypes.func,
    auth: PropTypes.object,
    fetchItemEdit: PropTypes.func,
    clearItemEdit: PropTypes.func,
    editItem: PropTypes.func,
    removeItem: PropTypes.func,
    sortItem: PropTypes.func,
    sortData: PropTypes.object,
    searchValue: PropTypes.string,
    searchItem: PropTypes.func
};

export default connect(mapStateToProps, actions)(WordsListContainer);