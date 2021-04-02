import React, { Component } from 'react';
import PropTypes from 'prop-types';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '../../../components/ui/text-field';

export default class ProxyContractSearch extends Component {
  static contextTypes = {
    t: PropTypes.func,
  };

  static defaultProps = {
    error: null,
  };

  static propTypes = {
    identities: PropTypes.object,
    onSearch: PropTypes.func,
    error: PropTypes.string,
    selectedAddress: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
    };
  }

  componentDidMount() {
    this.handleSearch('');
  }

  handleSearch(searchQuery) {
    this.setState({ searchQuery });
    let identResults = this.props.identities[this.props.selectedAddress];
    if (!identResults) {
      identResults = [];
    }
    const results = identResults
      .concat(
        identResults.length
          ? { nickname: '(main)', address: this.props.selectedAddress }
          : [],
      )
      .filter((ident) => {
        if (!searchQuery) {
          return true;
        }

        const { nickname = '', address = '' } = ident;
        return (
          (nickname || '').indexOf(searchQuery) >= 0 ||
          address.toLowerCase().indexOf(searchQuery.toLowerCase()) >= 0
        );
      });

    results.sort((a, b) => {
      if (a.nickname > b.nickname) {
        return 1;
      }
      if (a.nickname < b.nickname) {
        return -1;
      }
      return 0;
    });

    this.props.onSearch({ searchQuery, results });
  }

  renderAdornment() {
    return (
      <InputAdornment position="start" style={{ marginRight: '12px' }}>
        <img src="images/search.svg" />
      </InputAdornment>
    );
  }

  render() {
    const { error } = this.props;
    const { searchQuery } = this.state;

    return (
      <TextField
        id="search-tokens"
        placeholder={this.context.t('__metamonk_searchIdentity')}
        type="text"
        value={searchQuery}
        onChange={(e) => this.handleSearch(e.target.value)}
        error={error}
        fullWidth
        startAdornment={this.renderAdornment()}
      />
    );
  }
}
