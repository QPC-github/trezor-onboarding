import { defineMessages } from '@dragonraider5/react-intl';

const definedMessages = defineMessages({
    TR_HOLOGRAM_STEP_HEADING: {
        id: 'TR_HOLOGRAM_STEPHEADING',
        defaultMessage: 'Hologram check',
        description: 'Heading on hologram step page',
    },
    TR_HOLOGRAM_STEP_SUBHEADING: {
        id: 'TR_HOLOGRAM_STEP_SUBHEADING',
        defaultMessage: 'Please make sure hologram protecting your device is authentic',
        description: 'Subheading on hologram step page',
    },
    TR_HOLOGRAM_STEP_ACTION_OK: {
        id: 'TR_HOLOGRAM_STEP_ACTION_OK',
        defaultMessage: 'My hologram is OK',
        description: 'Button to click in allright case',
    },
    TR_HOLOGRAM_STEP_ACTION_NOT_OK: {
        id: 'TR_HOLOGRAM_STEP_ACTION_NOT_OK',
        defaultMessage: 'My hologram looks different',
        description: 'Button to click when hologram looks different',
    },
    TR_RESELLERS_LINK: {
        id: 'TR_RESELLERS_LINK',
        defaultMessage: 'a trusted reseller',
        description: 'Part of sentence. Link to page with trusted resellers list',
    },
    TR_CONTACT_OUR_SUPPORT_LINK: {
        id: 'TR_CONTACT_OUR_SUPPORT_LINK',
        defaultMessage: 'contact our support',
        description: 'Part of sentence. Link to support',
    },
    TR_DID_YOU_PURCHASE: {
        id: 'TR_DID_YOU_PURCHASE',
        defaultMessage: 'Did you purchase your device from {TR_RESELLERS_LINK}? If no, device you are holding in hands might be a counterfeit. Please {TR_CONTACT_OUR_SUPPORT_LINK}',
        description: 'Text to display when user is unhappy with his hologram.',
    },
});


export default definedMessages;