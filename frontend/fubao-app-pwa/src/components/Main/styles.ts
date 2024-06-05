import React from 'react'
import styled from 'styled-components';

export const WhiteBox = styled.div`
    border-radius: 15px;
    height: 15rem;
    background-color: white;
    padding: 1rem;
    margin: 1.3rem 0;
    cursor: pointer;
`;

export const EtiquetteWhiteBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    height: 3.7rem;
    background-color: white;
    padding: 1rem;
    margin: 1.3rem 0rem 0.5rem;
`;

export const EtiquetteWhiteBox1 = styled.div`
    display: flex;
    align-items: center;
    border-radius: 15px;
    height: 3.7rem;
    background-color: white;
    padding: 1rem;
    margin: 1.3rem 0rem 0.5rem;
`;

export const PendingBox = styled.div`
    border-radius: 15px;
    height: 15rem;
    padding: 1rem;
    margin: 1.3rem 0;
`;

export const AlignDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyText = styled.p`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0.5rem 0.2rem;
  color: ${props => props.color || 'black'}
`;