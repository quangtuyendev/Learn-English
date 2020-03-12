import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { GOOGLE_TRANSLATE_URL } from '../../constants';

const WordItem = ({ word, handleEditItem, showDeleteModal }) => {
    const { name, date } = word;
    return (
        <Fragment>
            <tr>
                <td>
                    <a href="/" className="table__text">{name}</a>
                </td>
                <td>
                    <a href={`${GOOGLE_TRANSLATE_URL}${name}`} className="table__text">
                        <span type="button" data-toggle="tooltip" data-placement="top" title="Click to listen">
                            <i className="fas fa-headphones-alt"></i>
                        </span>
                    </a>
                </td>
                <td>
                    <span className="table__text">
                        <Moment fromNow>{date}</Moment>
                    </span>
                </td>
                <td>
                    <div className="btn btn-group">
                        <button
                            onClick={() => handleEditItem(word)}
                            className="btn btn-warning"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click to edit">
                            <i className="far fa-edit"></i>
                        </button>
                        <button
                            onClick={() => showDeleteModal(word)}
                            className="btn btn-danger"
                            type="button"
                            data-toggle="tooltip"
                            data-placement="top"
                            title="Click to delete">
                            <i className="far fa-trash-alt"></i>
                        </button>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
};

WordItem.propTypes = {
    word: PropTypes.object,
    handleEditItem: PropTypes.func,
    showDeleteModal: PropTypes.func
};

export default WordItem;