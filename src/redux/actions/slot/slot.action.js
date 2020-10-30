import { SLOT, HEADERS } from "../_constants"
import axios from "axios"


export function setLoading(load) {
    return {
        type: SLOT.LOADING,
        load
    }
}

export function setSendLoading(loadPost) {
    return {
        type: SLOT.POST_LOADING,
        loadPost
    }
}

export function setSLOT(data = []) {
    return {
        type: SLOT.SUCCESS,
        data
    }
}
export function setNewest(dataNew = []) {
    return {
        type: SLOT.SUCCESS_NEWEST,
        dataNew
    }
}

export function setSLOTFailed(data = []) {
    return {
        type: SLOT.FAILED,
        data
    }
}

export const FetchSLOT = () => {
    return (dispatch) => {
        dispatch(setLoading(true));
        const headers = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        }
        axios.get(HEADERS.URL + "chartdata", headers)
        .then(function (response) {
            const data = response.data
            dispatch(setSLOT(data))
            dispatch(setLoading(false));
        })
        .catch(function (error) {
            // handle error
            
        })

    }
}
