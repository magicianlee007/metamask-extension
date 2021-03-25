/* eslint-disable react/prop-types */
/* eslint-disable react/no-unused-prop-types */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  DEFAULT_ROUTE,
  __METAMONK_ADD_PROXY_CONTRACT_ROUTE,
} from '../../helpers/constants/routes';
import Button from '../../components/ui/button';
import Identicon from '../../components/ui/identicon';
import TokenBalance from '../../components/ui/token-balance';

export default class ConfirmAddProxyContract extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static propTypes = {
    history: PropTypes.object,
    clearPendingProxyContracts: PropTypes.func,
    addIdentity: PropTypes.func,
    setSelectedIdentity: PropTypes.func,
    pendingIdentities: PropTypes.object,
  };

  componentDidMount() {
    const { pendingIdentities = {}, history } = this.props;

    if (Object.keys(pendingIdentities).length === 0) {
      history.push(DEFAULT_ROUTE);
    }
  }

  getIdentityDisplayName(identity) {
    const { nickname, address, functionHash } = identity;
    return typeof nickname === 'undefined'
      ? `${address.slice(0, 8)} @ ${functionHash.slice(2)}`
      : nickname;
  }

  getImportingIdentity() {
    // only one import is permitted for now
    return Object.values(this.props.pendingIdentities).filter(
      (x) => x.importing,
    )[0];
  }

  getSwitchingIdentity() {
    // if there is an "non-importing" identity, priorize it
    return (
      Object.values(this.props.pendingIdentities).filter(
        (x) => !x.importing,
      )[0] || this.getImportingIdentity()
    );
  }

  render() {
    const {
      history,
      addIdentity,
      setSelectedIdentity,
      clearPendingIdentities,
      pendingIdentities,
    } = this.props;

    return (
      <div className="page-container">
        <div className="page-container__header">
          <div className="page-container__title">
            {this.context.t('__metamonk_addProxyContracts')}
          </div>
          <div className="page-container__subtitle">
            {this.context.t('__metamonk_likeToAddProxyContract')}
          </div>
        </div>
        <div className="page-container__content">
          <div className="confirm-add-token">
            <div className="confirm-add-token__header">
              <div className="confirm-add-token__token">
                {this.context.t('__metamonk_proxyContractNickname')}
              </div>
              <div className="confirm-add-token__balance">
                {this.context.t('__metamonk_etherBalance')}
              </div>
            </div>
            <div className="confirm-add-token__token-list">
              {Object.entries(pendingIdentities).map(([address, identity]) => {
                return (
                  <div
                    className="confirm-add-token__token-list-item"
                    key={address}
                  >
                    <div className="confirm-add-token__token confirm-add-token__data">
                      <Identicon
                        className="confirm-add-token__token-icon"
                        diameter={48}
                        address={address}
                      />
                      <div className="confirm-add-token__name">
                        {this.getIdentityDisplayName(identity)}
                      </div>
                    </div>
                    <div className="confirm-add-token__balance">
                      <TokenBalance token={identity} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="page-container__footer">
          <header>
            <Button
              type="default"
              large
              className="page-container__footer-button"
              onClick={() => history.push(__METAMONK_ADD_PROXY_CONTRACT_ROUTE)}
            >
              {this.context.t('back')}
            </Button>
            <Button
              type="primary"
              large
              className="page-container__footer-button"
              onClick={() => {
                const importingIdentity = this.getImportingIdentity();
                const switchingIdentity = this.getSwitchingIdentity();

                const promiseSteps = Promise.all([
                  ...[
                    importingIdentity ? addIdentity(importingIdentity) : null,
                  ],
                  ...[
                    switchingIdentity
                      ? setSelectedIdentity(switchingIdentity)
                      : null,
                  ],
                ]);

                promiseSteps.then(() => {
                  clearPendingIdentities();
                  history.push(DEFAULT_ROUTE);
                });
              }}
            >
              {this.context.t('__metamonk_addProxyContract')}
            </Button>
          </header>
        </div>
      </div>
    );
  }
}
