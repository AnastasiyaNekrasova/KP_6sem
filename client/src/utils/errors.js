import React from 'react';

export function handleUnauthorizedError(error) {
    if (error.response && error.response.status === 401) {
      history.push('/error?status=401');
    }
  }