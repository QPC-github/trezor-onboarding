import React from 'react';
import types from 'config/types';
import styled, { keyframes } from 'styled-components';

const connectAnimation = keyframes`
    0%, 100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-4px)
    }
`;

const MovingCable = styled.g`
    animation: ${connectAnimation} 1s linear infinite;
`;

const ConnectDeviceIcon = ({ model }) => {
    if (model === 1) {
        return (
            <svg width="20px" height="57px" viewBox="0 0 20 57">
                <g stroke="none" strokeWidth="1" fill="none" transform="translate(1, 1)">
                    <MovingCable>
                        <rect fill="#01B757" x="6" y="39" width="6" height="5" />
                        <rect
                            stroke="#01B757"
                            strokeWidth="1"
                            x="8.5"
                            y="44.5"
                            width="1"
                            height="11"
                        />
                    </MovingCable>

                    <path
                        stroke="#01B757"
                        d="M8.90856859,33.9811778 L6.43814432,33.9811778 C5.45301486,34.0503113 4.69477081,33.6889084 4.1634122,32.8969691 C3.36637428,31.7090602 -0.000402169348,26.3761977 0.0748097911,23.2982514 C0.124878873,21.2492429 0.0999525141,14.5598149 3.07156595e-05,3.22996744 C-0.000274213164,3.1963928 0.00243636275,3.162859 0.00812115776,3.12976773 C0.28477346,1.51937083 1.22672004,0.617538852 2.8339609,0.424271782 C4.45813658,0.228968338 6.54411954,0.0875444105 9.09190977,0 L9.09190977,0.0169167084 C11.5566027,0.104886477 13.5814718,0.244169993 15.1665175,0.434768145 C16.7530267,0.625542287 17.6912941,1.50671985 17.9813196,3.07830083 C17.9943481,3.14889902 18.0005888,3.22058224 17.9999563,3.29236974 L17.9999901,3.29237004 C17.9004498,14.5907444 17.875676,21.2628703 17.9256686,23.3087478 C18.0008805,26.3866941 14.6341041,31.7195566 13.8370662,32.9074655 C13.3057075,33.6994047 12.5474635,34.0608076 11.562334,33.9916742 L8.90856859,33.9916742 L8.90856859,33.9811778 Z"
                    />
                    <rect
                        fill="#01B757"
                        x="2"
                        y="7"
                        width="14"
                        height="7"
                        rx="0.5625"
                    />
                    <rect
                        fill="#01B757"
                        x="2"
                        y="16"
                        width="6"
                        height="3"
                        rx="0.5625"
                    />
                    <rect
                        fill="#01B757"
                        x="10"
                        y="16"
                        width="6"
                        height="3"
                        rx="0.5625"
                    />
                </g>
            </svg>
        );
    }

    return (
        <svg
            width="50px"
            viewBox="0 0 74 98"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
        >
            <defs>
                <polygon
                    id="path-1"
                    points="0.000351976856 0.802786654 48.9846191 0.802786654 48.9846191 65.0908098 0.000351976856 65.0908098"
                />
            </defs>

            <path
                d="M28.154,67.784 L17.87,67.784 C16.664,67.784 15.536,67.208 14.852,66.248 L6.404,54.116 C2.354,48.296 0.218,41.57 0.218,34.664 L0.218,5.414 C0.218,2.546 2.684,0.218 5.714,0.218 L40.286,0.218 C43.316,0.218 45.782,2.552 45.782,5.414 L45.782,35.336 C45.782,42.566 43.454,49.556 39.05,55.55 L31.13,66.302 C30.44,67.232 29.336,67.784 28.154,67.784 Z M5.714,3.782 C4.646,3.782 3.782,4.514 3.782,5.414 L3.782,34.658 C3.782,40.832 5.696,46.856 9.332,52.07 L17.768,64.196 L28.154,64.22 C28.22,64.22 28.256,64.196 28.262,64.19 L36.176,53.444 C40.124,48.068 42.218,41.81 42.218,35.336 L42.218,5.414 C42.218,4.514 41.348,3.782 40.286,3.782 L5.714,3.782 Z"
                id="Shape"
                fill="#01B757"
            />

            <path
                d="M36.8,39.308 L9.2,39.308 C8.618,39.308 8.144,38.834 8.144,38.252 L8.144,13.028 C8.144,12.446 8.618,11.972 9.2,11.972 L36.8,11.972 C37.382,11.972 37.856,12.446 37.856,13.028 L37.856,38.246 C37.856,38.834 37.388,39.308 36.8,39.308 Z"
                id="Shape"
                fill="#01B757"
            />

            <MovingCable>
                <polygon
                    className="connect-t2-cable"
                    id="Shape"
                    fill="#01B757"
                    points="28.43 77.678 28.43 87.152 24.956 87.152 24.956 98 21.152 98 21.152 87.152 17.57 87.152 17.57 77.678"
                />
            </MovingCable>

            <mask id="mask-2" fill="white">
                <use href="#path-1" />
            </mask>


        </svg>
    );
};

ConnectDeviceIcon.propTypes = {
    model: types.model,
};

export default ConnectDeviceIcon;