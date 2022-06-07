const SEND_MESSAGE = 'DIALOGS/SEND-MESSAGE'

const initialState = {
    contactsList: [
        {id: 1, name: 'Maxim'},
        {id: 2, name: 'Ivan'},
        {id: 3, name: 'Vadim'},
        {id: 4, name: 'Maria'},
        {id: 5, name: 'Johnathon'},
    ],
    messages: [
        {id: 1, message: 'Hey!'},
        {id: 2, message: 'Hey Wassup'},
        {id: 3, message: 'Im okay, thx u?'},
        {id: 4, message: 'in some way using'}
    ]
}

const DialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state, messages: [
                    ...state.messages,
                    {id: state.messages.length+1, message: action.messageText}],
                newMessageText: ''
            }
        default:
            return state
    }
}

export const sendMessageAC = (messageText) => ({type: SEND_MESSAGE, messageText})


export default DialogsReducer