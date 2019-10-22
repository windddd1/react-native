import { createReducer, createActions } from 'reduxsauce'

const { Types, Creators } = createActions({
    setInfoModalBox: ['info'],
    changeFlagModalBox: []
})

export const ModalTypes = Types
export default Creators


export const INITIAL_STATE = {
    data : {
        title: '',
        id: '',
        body: '',
        flag: false
    },
}

export const changeTitle = (state, {info}) => {
    return { ...state, data:{
        title: info.title,
        id: info.id.toString(),
        body: info.body,
        flag: info.flag
    }}
}

export const changeFlag = (state) => {
    return { ...state, data: {
        flag: false
    }}
}

export const reducer = createReducer( INITIAL_STATE ,{
    [ModalTypes.SET_INFO_MODAL_BOX]: changeTitle,
    [ModalTypes.CHANGE_FLAG_MODAL_BOX] : changeFlag
})