// SPDX-License-Identifier: MIT
// Copyright (c) 2020 The Pybricks Authors

import { connect } from 'react-redux';
import { Dispatch } from '../actions';
import { flashFirmware } from '../actions/flash-firmware';
import * as notification from '../actions/notification';
import { RootState } from '../reducers';
import { BootloaderConnectionState } from '../reducers/bootloader';
import OpenFileButton, { OpenFileButtonProps } from './OpenFileButton';
import { TooltipId } from './button-i18n';
import firmwareIcon from './images/firmware.svg';

type StateProps = Pick<OpenFileButtonProps, 'enabled'>;
type DispatchProps = Pick<OpenFileButtonProps, 'onFile' | 'onReject' | 'onClick'>;
type OwnProps = Pick<OpenFileButtonProps, 'id'>;

const mapStateToProps = (state: RootState): StateProps => ({
    enabled: state.bootloader.connection === BootloaderConnectionState.Disconnected,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
    onFile: (data): void => {
        dispatch(flashFirmware(data));
    },
    onReject: (file): void => {
        dispatch(
            notification.add('error', `'${file.name}' is not a valid firmware file.`),
        );
    },
    onClick: (): void => {
        dispatch(flashFirmware());
    },
});

const mergeProps = (
    stateProps: StateProps,
    dispatchProps: DispatchProps,
    ownProps: OwnProps,
): OpenFileButtonProps => ({
    fileExtension: '.zip',
    tooltip: TooltipId.Flash,
    icon: firmwareIcon,
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OpenFileButton);
