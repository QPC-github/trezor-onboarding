import React from 'react';
import styled, { css } from 'styled-components';
import ReactTimeout from 'react-timeout';
import { Button, H1, P } from 'trezor-ui-components';
import { FormattedMessage } from 'react-intl';

import types from 'config/types';
import { Dots } from 'components/Loaders';
import { ControlsWrapper } from 'views/onboarding/components/Wrapper';

import l10nMessages from './index.messages';

const ANIMATION_DURATION = 2.5;

const Wrapper = styled.div`
    min-height: 600px;
`;

const Logo = styled.svg`
    display: block;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    opacity: 1;
    
    /* prevent animation on lang change */
    ${({ isConnectLoaded }) => (!isConnectLoaded ? css`
        & .path {
            animation: animation ${ANIMATION_DURATION}s ease-in;
        }    
    ` : null)}
    
    @keyframes animation {
        from { stroke-dasharray: 30 30}
        to { stroke-dasharray: 30 0}
    }
`;

const Loader = styled(P)`
    text-align: center;
`;

const FadeInWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    animation: fadeIn 0.5s linear;
    text-align: center;
    & > * {
        margin: 20px;
    }
    
    @keyframes fadeIn { 
        from { opacity: 0  }
        to { opacity: 1}
    }
`;

class WelcomeStep extends React.PureComponent {
    render() {
        return (
            <Wrapper>
                <Logo viewBox="30 8 60 30" enableBackground="new 0 0 340 333" isConnectLoaded={this.props.transport !== null}>
                    <path
                        className="path"
                        fill="#FFFFFF"
                        stroke="#000000"
                        strokeWidth="0.4"
                        d="M70.3,14.2v-3.5c0-5.9-5-10.7-11.2-10.7c-6.2,0-11.2,4.8-11.2,10.7v3.5h-4.6v24.6h0l15.9,7.4l15.9-7.4h0V14.2H70.3z
                        M53.6,10.7c0-2.7,2.5-5,5.5-5c3,0,5.5,2.2,5.5,5v3.5H53.6V10.7z M68.6,34.7l-9.5,4.4l-9.5-4.4V20h19V34.7z"
                    />
                </Logo>

                {
                    this.props.transport == null && <Loader>Loading<Dots maxCount={3} /></Loader>
                }

                {
                    this.props.transport !== null && (
                        <FadeInWrapper isConnectLoaded={this.props.transport !== null}>
                            <H1>
                                <FormattedMessage {...l10nMessages.TR_WELCOME_TO_TREZOR} />
                            </H1>

                            <ControlsWrapper>
                                <Button onClick={() => this.props.onboardingActions.goToNextStep()}>
                                    <FormattedMessage {...l10nMessages.TR_GET_STARTED} />
                                </Button>
                            </ControlsWrapper>
                        </FadeInWrapper>
                    )
                }
            </Wrapper>
        );
    }
}

WelcomeStep.propTypes = {
    onboardingActions: types.onboardingActions.isRequired,
    transport: types.transport,
};

export default ReactTimeout(WelcomeStep);