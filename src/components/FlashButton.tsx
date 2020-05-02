import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { flashFirmware } from '../actions/bootloader';
import * as notification from '../actions/notification';
import { RootState } from '../reducers';
import { BootloaderConnectionState } from '../reducers/bootloader';
import OpenFileButton, { OpenFileButtonProps } from './OpenFileButton';

type Dispatch = ThunkDispatch<{}, {}, AnyAction>;

type StateProps = Pick<OpenFileButtonProps, 'enabled'>;
type DispatchProps = Pick<OpenFileButtonProps, 'onFile' | 'onReject'>;
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
});

const mergeProps = (
    stateProps: StateProps,
    dispatchProps: DispatchProps,
    ownProps: OwnProps,
): OpenFileButtonProps => ({
    fileExtension: '.bin',
    tooltip: 'Flash hub firmware',
    icon: 'firmware.svg',
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(OpenFileButton);