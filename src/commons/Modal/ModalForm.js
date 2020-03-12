import { connect } from "react-redux";

const ModalForm = ({ modal }) => {
    const { isShow, modalContent } = modal;
    return isShow && modalContent;
};

const mapStateToProps = state => ({
    modal: state.modal
});

export default connect(mapStateToProps)(ModalForm);