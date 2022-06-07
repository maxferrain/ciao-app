import React from "react";
import {Loader} from "../components/common/Loader/Loader";


const withSuspend = (WrappedComponent) => {
    return (props) => {
        return <React.Suspense fallback={<Loader/>}>
            <WrappedComponent {...props}/>
        </React.Suspense>
    }
}
export default withSuspend