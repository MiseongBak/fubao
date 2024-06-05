import styled from 'styled-components';

export const Wireframe = styled.div`
    border: 1px solid black;
`;

export const HomeIcon = styled.div`
    position: absolute;
    top: 1.5rem;
    right: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color || 'black'}
;
`;

export const HomeIconLeft = styled.div`
    position: absolute;
    top: 2rem;
    left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color || 'black'};
    z-index: 1;
;
`;