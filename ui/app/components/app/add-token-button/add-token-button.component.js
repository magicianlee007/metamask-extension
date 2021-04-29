import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMetricEvent } from '../../../hooks/useMetricEvent';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { getCurrentProxyMode } from '../../../selectors';
import {
  ADD_TOKEN_ROUTE,
  __METAMONK_ADD_PROXY_CONTRACT_ROUTE,
} from '../../../helpers/constants/routes';
import Button from '../../ui/button';

export default function AddTokenButton() {
  const currentProxyMode = useSelector(getCurrentProxyMode);
  const addTokenEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Token Menu',
      name: 'Clicked "Add Token"',
    },
  });
  const t = useI18nContext();
  const history = useHistory();

  return (
    <div className="add-token-button">
      <Button
        className="add-token-button__button"
        type="secondary"
        rounded
        onClick={() => {
          history.push(ADD_TOKEN_ROUTE);
          addTokenEvent();
        }}
      >
        {t('addToken')}
      </Button>
      {/* {currentProxyMode && (
        <Button
          className="add-token-button__button"
          type="secondary"
          rounded
          onClick={() => {
            console.log('add proxy token contract');
            history.push(__METAMONK_ADD_PROXY_CONTRACT_ROUTE);
          }}
        >
          Use Another...
        </Button>
      )} */}
    </div>
  );
}
