import React from 'react';
import styled from 'styled-components';
import {
    Button, Link, Input, Checkbox,
} from 'trezor-ui-components';
import { Flags } from 'trezor-flags';
import { FormattedMessage, injectIntl } from '@dragonraider5/react-intl';

import types from 'config/types';
import { SOCIAL_FACEBOOK_URL, SOCIAL_BLOG_URL, SOCIAL_TWITTER_URL } from 'config/urls';
import { IconSocial } from 'components/Icons';
import { validateEmail } from 'utils/validate';
import { SUBMIT_EMAIL } from 'actions/constants/fetchCalls';
import { APPLY_FLAGS } from 'actions/constants/calls';
import Text from 'components/Text';
import l10nCommonMessages from 'support/commonMessages';

import {
    StepWrapper, StepBodyWrapper, StepHeadingWrapper, ControlsWrapper, CheckboxWrapper,
} from 'components/Wrapper';

import l10nMessages from './index.messages';

const CheckboxexSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const SocialWrapper = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    margin-bottom: 30px;
    & * {
        margin: auto 8px auto 8px
    }
`;

// todo: currently the same InputWrapper used also in NameStep but wait for final design decision
const InputWrapper = styled.div`
    display: flex;
    align-items: flex-start;
    height: 70px;
`;

class NewsleterStep extends React.Component {
    getBottomText() {
        return this.validateInput().bottomText;
    }

    getEmailStatus() {
        const { fetchCall, newsletter } = this.props;
        if (fetchCall.name === SUBMIT_EMAIL && fetchCall.isProgress) {
            return 'sending';
        }
        if ((fetchCall.name === SUBMIT_EMAIL && fetchCall.result) || newsletter.skipped) {
            return 'success';
        }
        if (fetch.name === SUBMIT_EMAIL && fetch.error) {
            return 'error';
        }
        return null;
    }

    getStatus() {
        const { fetchCall, newsletter } = this.props;
        if ((fetchCall.name === SUBMIT_EMAIL && fetchCall.result) || newsletter.skipped) {
            return 'socials';
        }
        return 'initial';
    }

    validateInput = () => {
        const { email } = this.props.newsletter;
        if (!email) {
            return { state: null };
        }
        if (!validateEmail(email)) {
            return { state: 'error', bottomText: this.props.intl.formatMessage(l10nMessages.TR_WRONG_EMAIL_FORMAT) };
        }
        return { state: 'success' };
    }

    handleInputChange = (event) => {
        this.props.newsletterActions.setEmail(event.target.value);
    }

    goToNextStep = () => {
        this.props.connectActions.callActionAndGoToNextStep(APPLY_FLAGS, {
            flags: Flags.setFlag('hasEmail', this.props.device.features.flags),
        });
    }

    submitEmail = () => {
        this.props.newsletterActions.submitEmail();
    }

    skipEmail() {
        this.props.newsletterActions.setSkipped();
    }

    render() {
        const status = this.getStatus();
        const { newsletter, newsletterActions } = this.props;
        return (
            <StepWrapper>
                <StepHeadingWrapper>
                    <FormattedMessage {...l10nMessages.TR_NEWSLETTER_HEADING} />
                </StepHeadingWrapper>
                <StepBodyWrapper>
                    {
                        status === 'initial' && (
                            <React.Fragment>
                                <Text>
                                    <FormattedMessage {...l10nMessages.TR_NEWSLETTER_SUBHEADING} />
                                </Text>
                                <InputWrapper>
                                    <Input
                                        value={newsletter.email}
                                        placeholder="Email"
                                        state={this.validateInput().state}
                                        bottomText={this.getBottomText()}
                                        onChange={this.handleInputChange}
                                        isDisabled={this.getEmailStatus() === 'sending'}
                                    />
                                </InputWrapper>

                                <CheckboxexSection>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            isChecked={newsletter.checkboxes.security}
                                            onClick={() => newsletterActions.toggleCheckbox('security')}
                                        />
                                        <Text>
                                            Security
                                        </Text>
                                    </CheckboxWrapper>
                                    <CheckboxWrapper>
                                        <Checkbox
                                            isChecked={newsletter.checkboxes.promo}
                                            onClick={() => newsletterActions.toggleCheckbox('promo')}
                                        />
                                        <Text>
                                            Promo
                                        </Text>
                                    </CheckboxWrapper>
                                </CheckboxexSection>
                                
                                <ControlsWrapper>
                                    <Button
                                        isDisabled={this.validateInput().state !== 'success' || this.getEmailStatus() === 'sending'}
                                        onClick={this.submitEmail}
                                    >
                                        <FormattedMessage {...l10nCommonMessages.TR_SUBMIT} />
                                    </Button>
                                    <Button isWhite onClick={() => this.skipEmail()}>
                                        <FormattedMessage {...l10nCommonMessages.TR_SKIP} />
                                    </Button>
                                </ControlsWrapper>
                            </React.Fragment>
                        )
                    }

                    {
                        status === 'socials' && (
                            <React.Fragment>
                                {
                                    !newsletter.skipped && (
                                        <Text>
                                            <FormattedMessage {...l10nMessages.TR_THANK_YOU_FOR_EMAIL} />
                                        </Text>
                                    )
                                }
                                {
                                    newsletter.skipped && (
                                        <Text>
                                            <FormattedMessage {...l10nMessages.TR_EMAIL_SKIPPED} />
                                        </Text>
                                    )
                                }
                                <SocialWrapper>
                                    <Link href={SOCIAL_BLOG_URL}>
                                        <IconSocial name="medium" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_FACEBOOK_URL}>
                                        <IconSocial name="facebook" sizeMultiplier={2} />
                                    </Link>
                                    <Link href={SOCIAL_TWITTER_URL}>
                                        <IconSocial name="twitter" sizeMultiplier={2} />
                                    </Link>
                                </SocialWrapper>
                                <ControlsWrapper>
                                    <Button onClick={() => this.goToNextStep()}>
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

NewsleterStep.propTypes = {
    connectActions: types.connectActions.isRequired,
    fetchCall: types.fetchCall,
    device: types.device,
};

export default injectIntl(NewsleterStep);