import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import {sendMessageAC} from "../../redux/dialogs-reducer";
import {compose} from "redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const mapStateToProps = (state) => {
    return {
        contactsList: state.dialogsPage.contactsList,
        messages: state.dialogsPage.messages
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (messageText) => {
            dispatch(sendMessageAC(messageText))
        }
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(Dialogs)

