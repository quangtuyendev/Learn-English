import React, { useContext } from 'react';
import { LoadingContext } from '../../../contexts/loading';
import LoadingGif from '../../../assets/images/loading.png';

export default function Loading() {
  const [loading] = useContext(LoadingContext);
  return loading ? (
    <div className="loading">
      <img className="loading-image" src={LoadingGif} alt="Loading" />
    </div>
  ) : null;
}
