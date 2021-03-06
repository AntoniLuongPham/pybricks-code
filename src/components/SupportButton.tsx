// SPDX-License-Identifier: MIT
// Copyright (c) 2020 The Pybricks Authors

import { connect } from 'react-redux';
import LinkButton, { LinkButtonProps } from './LinkButton';
import { TooltipId } from './button-i18n';
import supportIcon from './images/support.svg';

type StateProps = undefined;
type DispatchProps = undefined;
type OwnProps = Pick<LinkButtonProps, 'id'>;

const mergeProps = (
    _stateProps: StateProps,
    _dispatchProps: DispatchProps,
    ownProps: OwnProps,
): LinkButtonProps => ({
    url: 'https://github.com/pybricks/support/issues',
    tooltip: TooltipId.Support,
    icon: supportIcon,
    ...ownProps,
});

export default connect(undefined, undefined, mergeProps)(LinkButton);
