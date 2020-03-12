import classnames from 'classnames';
import _ from 'lodash';
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, Row } from 'reactstrap';

const sorts = [
    {
        name: 'From A to Z',
        sort: { sortBy: 'name', sortValue: 1 }
    },
    {
        name: 'From Z to A',
        sort: { sortBy: 'name', sortValue: -1 }
    },
    {
        name: 'Recently words',
        sort: { sortBy: 'date', sortValue: 1 }
    },
    {
        name: 'Old words',
        sort: { sortBy: 'date', sortValue: -1 }
    }
];


export const WordHeader = ({ props }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [activeClass, setActiveClass] = useState('From A to Z');
    const {
        showAddModal,
        handleSort,
        handleSearch,
        searchValue,
        words
    } = props;

    const onSort = ({ sortBy, sortValue }, name) => {
        setActiveClass(name);
        handleSort({ sortBy, sortValue });
    };

    const toggleMySelect = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const renderSorts = () => (
        _.map(sorts, ({sort, name }) => (
            <DropdownItem key={name}
                className={classnames({
                    'active': activeClass === name
                })}
                onClick={() => onSort(sort, name)}
            >
             {name}   
            </DropdownItem>
        ))
    );

    const renderQuantity = () => {
        if (words.length > 1) {
            return `${words.length} words`;
        } else {
            return `${words.length} word`;
        };
    };

    return (
        <Fragment>
            <Row>
                <Col sm="8">
                    <div className="vocabulary">
                        <h3 className="vocabulary__heading">Những từ vựng tiếng anh đã tạo</h3>
                        <span className="vocabulary__quantity">
                            { words.length ? renderQuantity() : null }
                        </span>
                    </div>
                </Col>
                <Col sm="4">
                    <Input
                        style={{ fontSize: "1.4rem", padding: "2rem" }}
                        placeholder="Search something..."
                        name="search"
                        onChange={handleSearch}
                        autoComplete="off"
                    />
                    {searchValue && <span className="form-search-text">Result for: <b>{searchValue}</b></span>}
                </Col>
            </Row>
            <Row className="mt-2">
                <Col sm="6">
                    <Button onClick={showAddModal} color="primary">
                        <i className="far fa-plus-square"></i>
                        Add your word
                    </Button>
                </Col>
                <Col sm="6" className="d-flex justify-content-end align-items-end">
                    <Dropdown className="sort-words" isOpen={dropdownOpen} toggle={toggleMySelect}>
                        <DropdownToggle caret>
                            {activeClass}
                        </DropdownToggle>
                        <DropdownMenu>
                            {renderSorts()}
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>
        </Fragment>
    );
};

WordHeader.propTypes = {
    props: PropTypes.object,
    words: PropTypes.object
};