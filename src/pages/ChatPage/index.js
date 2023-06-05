import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatComponent from './ChatPage';
import { list } from '../../store/actions/chat';

export const ChatPage = connect(
    () => {
        return (state, props) => ({
            chatPending: state.chat.getList.pending,
            data: state.chat.list
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            chatList: list,
        }, dispatch)
    })
)(ChatComponent);