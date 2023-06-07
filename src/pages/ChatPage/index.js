import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ChatComponent from './ChatPage';
import { getTitles, list, validate } from '../../store/actions/chat';
import { createSelector } from 'reselect';

export const ChatPage = connect(
    () => {

        const selectMode = (state) => state.chat.titles;
        const selectInitialValues = createSelector(
            selectMode,
            (mode) => {
                return {
                        title: '',
                        content: '',
                }
            }
        )

        return (state, props) => ({
            essayTitlesPending: state.chat.getTitle.pending,
            validatePending: state.chat.validate.pending,
            titles: state.chat.titles,
            validations: state.chat.validations,
            initialValues: selectInitialValues(state, props)
        });
    },
    (dispatch, props) => ({
        actions: bindActionCreators({
            chatList: list,
            getTitles: getTitles,
            validateEssay: validate,
        }, dispatch)
    })
)(ChatComponent);