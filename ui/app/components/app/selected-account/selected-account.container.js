import { connect } from 'react-redux';
import {
  getSelectedIdentity,
  getCurrentProxyIdentity,
  getCurrentProxyMode,
} from '../../../selectors';
import SelectedAccount from './selected-account.component';

const mapStateToProps = (state) => {
  return {
    selectedIdentity: getSelectedIdentity(state),
    currentProxyIdentity: getCurrentProxyIdentity(state),
    currentProxyMode: getCurrentProxyMode(state),
  };
};

export default connect(mapStateToProps)(SelectedAccount);
