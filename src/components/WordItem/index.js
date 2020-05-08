import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { GOOGLE_TRANSLATE_URL } from '../../constants';

WordItem.propTypes = {
  handleEditItem: PropTypes.func.isRequired,
  showDeleteModal: PropTypes.func.isRequired,
  handleViewImage: PropTypes.func.isRequired,
  word: PropTypes.object,
};

WordItem.defaultProps = {
  word: {},
};

export default function WordItem({
  word,
  handleEditItem,
  showDeleteModal,
  handleViewImage,
}) {
  let { name, image, date } = word;
  return (
    <>
      <tr>
        <td>
          <a
            rel="noopener noreferrer"
            href={`${GOOGLE_TRANSLATE_URL}${name.toLowerCase()}`}
            className="table-text"
            target="_blank"
          >
            {name.toLowerCase()}
          </a>
        </td>
        <td>
          <div className="action-box">
            <a
              rel="noopener noreferrer"
              href={`${GOOGLE_TRANSLATE_URL}${name.toLowerCase()}`}
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Click to listen"
              target="_blank"
            >
              <i className="fas fa-headphones-alt" />
            </a>
            <span
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Click to view"
            >
              <i
                onClick={() => handleViewImage(image)}
                className="far fa-image"
              />
            </span>
          </div>
        </td>
        <td>
          <span className="table-text">
            <Moment fromNow>{date}</Moment>
          </span>
        </td>
        <td>
          <div className="btn btn-group">
            <button
              onClick={() =>
                handleEditItem({
                  ...word,
                  name: name.toLowerCase(),
                })
              }
              className="btn btn-warning"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Click to edit"
            >
              <i className="far fa-edit" />
            </button>
            <button
              onClick={() => showDeleteModal(word)}
              className="btn btn-danger"
              type="button"
              data-toggle="tooltip"
              data-placement="top"
              title="Click to delete"
            >
              <i className="far fa-trash-alt" />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
}
