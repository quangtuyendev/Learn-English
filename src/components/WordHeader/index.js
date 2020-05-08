import classnames from 'classnames';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
} from 'reactstrap';
import { WordContext } from '../../contexts/word';
import { SORTS } from '../../constants';

WordHeader.propTypes = {
  showAddModal: PropTypes.func.isRequired,
  handleSort: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

WordHeader.defaultProps = {
  searchValue: '',
};

export default function WordHeader({
  showAddModal,
  handleSort,
  handleSearch,
  searchValue,
}) {
  const [words] = useContext(WordContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeClass, setActiveClass] = useState('From A to Z');
  const onSort = ({ sortBy, sortValue }, name) => {
    setActiveClass(name);
    handleSort({ sortBy, sortValue });
  };

  const toggleMySelect = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const renderSorts = () =>
    _.map(SORTS, ({ sort, name }) => (
      <DropdownItem
        key={name}
        className={classnames({
          active: activeClass === name,
        })}
        onClick={() => onSort(sort, name)}
      >
        {name}
      </DropdownItem>
    ));

  const renderQuantity = () => {
    if (words.length > 1) {
      return `${words.length} words`;
    } else {
      return `${words.length} word`;
    }
  };

  return (
    <>
      <Row>
        <Col sm="8">
          <div className="vocabulary">
            <h3 className="vocabulary__heading">
              The English vocabulary created
            </h3>
            <span className="vocabulary__quantity">
              {words.length ? renderQuantity() : null}
            </span>
          </div>
        </Col>
        <Col sm="4">
          <Input
            className="search-input"
            placeholder="Search something..."
            name="search"
            value={searchValue}
            onChange={handleSearch}
            autoComplete="off"
          />
          {searchValue && (
            <span className="form-search-text">
              Result for: <b>{searchValue}</b>
            </span>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col sm="6">
          <Button onClick={showAddModal} color="primary">
            <i className="far fa-plus-square" />
            Add your word
          </Button>
        </Col>
        <Col sm="6" className="d-flex justify-content-end align-items-end">
          <Dropdown
            className="sort-words"
            isOpen={dropdownOpen}
            toggle={toggleMySelect}
          >
            <DropdownToggle caret>{activeClass}</DropdownToggle>
            <DropdownMenu>{renderSorts()}</DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
}
