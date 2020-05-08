import PropTypes from 'prop-types';
import React from 'react';
import WordHeader from '../WordHeader';

WordsList.propTypes = {
  showAddModal: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
  ]),
};

WordsList.defaultProps = {
  searchValue: '',
};

export default function WordsList({
  children,
  showAddModal,
  handleSort,
  handleSearch,
  searchValue,
}) {
  return (
    <section id="section-vocabularies">
      <div className="container">
        <WordHeader
          showAddModal={showAddModal}
          handleSort={handleSort}
          handleSearch={handleSearch}
          searchValue={searchValue}
        />
        <div className="row">
          <div className="col-12">
            <table>
              <thead>
                <tr>
                  <th>
                    <h4 className="table-heading">Words</h4>
                  </th>
                  <th>
                    <h4 className="table-heading">Pronounce and view</h4>
                  </th>
                  <th>
                    <h4 className="table-heading">Last practice</h4>
                  </th>
                  <th>
                    <h4 className="table-heading">Actions</h4>
                  </th>
                </tr>
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
