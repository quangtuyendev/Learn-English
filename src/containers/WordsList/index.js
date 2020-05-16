import { css } from 'glamor';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import {
  clearItemEdit,
  deleteItem,
  fetchItemEdit,
  hideLoading,
  hideModal,
  saveItem,
  showLoading,
  showModal,
} from '../../actions';
import {
  deleteItem as deleteItemRequest,
  postItem,
  putItem,
} from '../../api/words';
import QuickView from '../../commons/Modal/QuickView';
import RemoveModal from '../../commons/Modal/RemoveModal';
import SaveForm from '../../components/Forms/SaveForm';
import WordItem from '../../components/WordItem';
import WordsList from '../../components/WordList';
import { AuthContext } from '../../contexts/auth';
import { EditItemContext } from '../../contexts/editItem';
import { LoadingContext } from '../../contexts/loading';
import { ModalContext } from '../../contexts/modal';
import { WordContext } from '../../contexts/word';
import welComeGif from '../../assets/images/welcome.gif';

import sadIcon from '../../assets/images/sad-icon.svg';

export default function WordsListContainer() {
  const [words, wordActions] = useContext(WordContext);
  const [, loadingActions] = useContext(LoadingContext);

  const INITIAL_SEARCH = sessionStorage.getItem('search') || '';
  const [searchValue, setSearchValue] = useState(INITIAL_SEARCH);
  const [sortData, setSortData] = useState({
    sortBy: 'name',
    sortValue: 1,
  });
  const [{ isAuthenticated }] = useContext(AuthContext);
  const [, modalActions] = useContext(ModalContext);
  const [, editItemActions] = useContext(EditItemContext);

  // Handle sort words
  const handleSort = ({ sortBy, sortValue }) => {
    setSortData({ sortBy, sortValue });
  };

  // Handle search words
  const handleSearch = ({ target: { value } }) => {
    sessionStorage.setItem('search', value);
    setSearchValue(value);
  };

  const handleHideLoading = () => {
    loadingActions(hideLoading());
  };

  const hadleShowLoading = () => {
    loadingActions(showLoading());
  };

  const handleShowModal = (component) => {
    modalActions(showModal(component));
  };

  const handleHideModal = () => {
    modalActions(hideModal());
  };

  const handleFetchItemEdit = (item) => {
    editItemActions(fetchItemEdit(item));
  };

  const handleClearItemEdit = () => {
    editItemActions(clearItemEdit());
  };

  // handle save item
  const handleSaveItem = async (word) => {
    const { id, name } = word;
    if (!id) {
      try {
        const { data } = await postItem(word);
        wordActions(
          saveItem(data, () => {
            handleHideModal();
            hadleShowLoading();
            setTimeout(() => {
              handleHideLoading();
            }, 1000);
            toast.success(`Add ${name} successfully`, {
              position: toast.POSITION.BOTTOM_LEFT,
              autoClose: 2000,
              bodyClassName: css({
                fontSize: '1.6rem',
              }),
            });
          })
        );
      } catch (error) {
        console.log('Add item faild');
      }
    } else {
      await putItem(id, word);
      wordActions(
        saveItem(word, () => {
          handleHideModal();
          hadleShowLoading();
          setTimeout(() => {
            handleHideLoading();
          }, 1000);
          toast.warn(`Edit ${name} successfully`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            bodyClassName: css({
              fontSize: '1.6rem',
            }),
          });
        })
      );
    }
  };

  const filterWords = () => {
    let newWords = [...words];
    if (searchValue) {
      newWords = _.filter(
        words,
        ({ name }) =>
          name.toLowerCase().indexOf(searchValue.toLowerCase().trim()) !== -1
      );
      return newWords;
    }
    if (sortData) {
      const { sortBy, sortValue } = sortData;
      if (sortBy === 'name') {
        newWords = words.sort((a, b) => {
          if (a.name < b.name) {
            return -sortValue;
          }
          if (a.name > b.name) {
            return sortValue;
          }
          return 0;
        });
      } else {
        newWords = words.sort((a, b) => {
          if (a.date < b.date) {
            return sortValue;
          }
          if (a.date > b.date) {
            return -sortValue;
          }
          return 0;
        });
      }
      return newWords;
    }
    return newWords;
  };

  // handle show modal to add item
  const showAddModal = () => {
    const component = (
      <SaveForm
        modalTitle="Add item"
        handleHideModal={handleHideModal}
        handleSaveItem={handleSaveItem}
        handleHideLoading={handleHideLoading}
        hadleShowLoading={hadleShowLoading}
      />
    );
    handleClearItemEdit();
    handleShowModal(component);
  };

  // handle show modal delete item
  const showDeleteModal = ({ name, id }) => {
    const handleDelete = () => {
      deleteItemRequest(id);
      wordActions(
        deleteItem(id, () => {
          handleHideModal();
          hadleShowLoading();
          setTimeout(() => {
            handleHideLoading();
          }, 1000);
          toast.error(`${name} deleted successfully!`, {
            position: toast.POSITION.BOTTOM_LEFT,
            autoClose: 2000,
            bodyClassName: css({
              fontSize: '1.6rem',
            }),
          });
        })
      );
    };

    const component = (
      <RemoveModal
        name={name}
        id={id}
        handleDelete={handleDelete}
        handleHideModal={handleHideModal}
        modalTitle="Remove item"
      />
    );
    handleShowModal(component);
  };

  // handle show modal edit item
  const handleEditItem = (value) => {
    handleFetchItemEdit(value);
    const component = (
      <SaveForm
        modalTitle="Update item"
        handleHideModal={handleHideModal}
        handleSaveItem={handleSaveItem}
      />
    );
    handleShowModal(component);
  };

  // handle view image
  const handleViewImage = (image) => {
    const modalContent = (
      <QuickView image={image} handleHideModal={handleHideModal} />
    );
    handleShowModal(modalContent);
  };

  const renderWords = () => {
    if (!filterWords().length && searchValue) {
      return (
        <tr className="table-nothing">
          <td>
            <img className="loading-image" src={sadIcon} alt="Sad icon" />
            <h2>No thing here!</h2>
          </td>
        </tr>
      );
    } else {
      return _.map(filterWords(), (word) => (
        <WordItem
          key={word.id}
          word={word}
          handleEditItem={handleEditItem}
          showDeleteModal={showDeleteModal}
          handleViewImage={handleViewImage}
        />
      ));
    }
  };

  return isAuthenticated ? (
    <WordsList
      showAddModal={showAddModal}
      handleSort={handleSort}
      handleSearch={handleSearch}
      searchValue={searchValue}
    >
      {renderWords(words)}
    </WordsList>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-12 p-0">
          <div className="box-welcome d-flex align-items-center">
            <img className="loading-image" src={welComeGif} alt="Welcome Gif" />
            <h3 className="box-welcome-text">
              Welcome. Please sign in or sign up!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
