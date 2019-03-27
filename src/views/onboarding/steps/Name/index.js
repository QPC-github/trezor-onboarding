import React from 'react';
import {
    P, Button, Input,
} from 'trezor-ui-components';
import styled from 'styled-components';
import { FormattedMessage, injectIntl } from 'react-intl';

import types from 'config/types';
import { validateASCII } from 'utils/validate';

import l10nCommonMessages from 'support/commonMessages';
import l10nMessages from './index.messages';
import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper,
} from '../../components/Wrapper';

const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
`;

class NameStep extends React.Component {
    constructor() {
        super();
        this.state = {
            label: '',
            labelChanged: false,
        };
    }

    changeLabel = async () => {
        const { label } = this.state;
        await this.props.connectActions.applySettings({ label });
        // call was successful
        if (this.props.deviceCall.result) {
            this.setState({ labelChanged: true });
        }
    }

    handleInputChange = (event) => {
        this.setState({ label: event.target.value });
    }

    validateInput = () => {
        if (!this.state.label) {
            return { state: '' };
        }
        if (!validateASCII(this.state.label)) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_ONLY_ASCII) };
        }
        if (this.state.label.length > 16) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_TOO_LONG) };
        }
        return { state: 'success', bottomText: this.props.intl.formatMessage(l10nMessages.TR_NAME_OK) };
    }

    render() {
        const { device } = this.props;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    { !this.state.labelChanged && <FormattedMessage {...l10nMessages.TR_NAME_HEADING} /> }
                    { this.state.labelChanged && <FormattedMessage {...l10nMessages.TR_NAME_HEADING_CHANGED} values={{ label: device.features.label }} /> }

                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        !this.state.labelChanged && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_NAME_SUBHEADING} />
                                </P>
                                <InputWrapper>
                                    <Input
                                        value={this.state.label}
                                        placeholder=""
                                        state={this.validateInput().state ? this.validateInput().state : null}
                                        bottomText={this.validateInput().bottomText ? this.validateInput().bottomText : ''}
                                        onChange={this.handleInputChange}
                                        isDisabled={this.props.deviceCall.isProgress}
                                    />
                                    <Button isDisabled={this.validateInput().state !== 'success'} onClick={this.changeLabel}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SUBMIT} />
                                    </Button>
                                </InputWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        this.state.labelChanged && (
                            <React.Fragment>
                                <P>
                                    <FormattedMessage {...l10nMessages.TR_NAME_CHANGED_TEXT} />
                                </P>
                                <ControlsWrapper>
                                    <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_CONTINUE} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }
                </StepBodyWrapper>
            </StepWrapper>
        );
    }
}

NameStep.propTypes = {
    connectActions: types.connectActions,
    onboardingActions: types.onboardingActions.isRequired,
    deviceCall: types.deviceCall.isRequired,
    device: types.deviceCall,
};

export default injectIntl(NameStep);