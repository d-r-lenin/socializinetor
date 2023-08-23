import React from 'react'

import { Navigate } from "react-router-dom";
import { useDispatch } from 'react-redux';

import { resetError } from "../slices/auth";


function Redirect({to}) {
    const dispatch = useDispatch();
    resetError(dispatch);
    return <Navigate to={to} />;
}

export default Redirect