import { connect } from 'react-redux';
import ProxyContractSearch from './proxy-contract-search.component';

const mapStateToProps = (state) => {
  // eslint-disable-next-line camelcase
  const { __metamonk_accountIdentities, selectedAddress } = state.metamask;
  console.log(state.metamask);
  console.log(state);
  return {
    identities: __metamonk_accountIdentities,
    selectedAddress,
  };
};

export default connect(mapStateToProps)(ProxyContractSearch);
