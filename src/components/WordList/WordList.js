import React from 'react';
import PropTypes from 'prop-types';
import { WordHeader } from '../WordHeader/WordHeader';

export const WordsList = ({ props, children }) => {
    return (
        <section id="section-vocabularies">
            <div className="container">
                <WordHeader props={{ ...props }} />
                <div className="row">
                    <div className="col-12">
                        <table>
                            <thead>
                                <tr>
                                    <th><h4 className="table-heading">Words</h4></th>
                                    <th><h4 className="table-heading">Pronounce and view</h4></th>
                                    <th><h4 className="table-heading">Last practice</h4></th>
                                    <th><h4 className="table-heading">Actions</h4></th>
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </section>
    );
};

WordsList.propTypes = {
    props: PropTypes.object,
    children: PropTypes.array
};