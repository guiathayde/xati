import styled from 'styled-components';
import { lighten } from 'polished';
import { Styles } from 'react-modal';

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;

  border-radius: 12px;

  background-color: black;

  animation: animatebottom 0.4s;

  @keyframes animatebottom {
    from {
      bottom: -300px;
      opacity: 0;
    }

    to {
      bottom: 0;
      opacity: 1;
    }
  }

  .reactEasyCrop_Container {
    border-radius: 12px;
  }
`;

export const CropContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 128px;
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  width: 80%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SliderField = styled.div`
  display: flex;
  align-items: center;

  width: 100%;

  label {
    font-weight: 700;
    font-size: 16px;
    line-height: 19px;
    color: white;
    text-shadow: 2px 0 black, -2px 0 black, 0 2px black, 0 -2px black,
      1px 1px black, -1px -1px black, 1px -1px black, -1px 1px black;

    min-width: 68px;

    margin-right: 12px;
  }
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  background: #377dff;
  border-radius: 2px;

  margin: 12px 0;

  &:focus {
    outline: none;
  }

  &:disabled {
    cursor: default;
    opacity: 0.38;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    width: 3px;
    height: 3px;

    border-radius: 50%;
    background: #377dff;

    cursor: pointer;

    transform: scale(6, 6);
    transition: box-shadow 0.2s;
  }

  &::-moz-range-thumb {
    width: 3px;
    height: 3px;

    border-radius: 50%;
    background: #377dff;

    cursor: pointer;

    transform: scale(6, 6);
    transition: box-shadow 0.2s;
  }

  &::-webkit-slider-thumb:hover {
    box-shadow: 0 0 0 1px ${lighten(0.3, '#377dff')};
  }

  &:focus::-webkit-slider-thumb {
    box-shadow: 0 0 0 1px ${lighten(0.2, '#377dff')};
  }

  &:active::-webkit-slider-thumb {
    box-shadow: 0 0 0 1px ${lighten(0.1, '#377dff')};
  }
`;

export const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;

  margin-top: 16px;
  margin-bottom: 16px;
`;

export const modalDefaultStyles: Styles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    inset: 0,
    width: '100%',
    height: '100%',
    maxWidth: 425,
    backgroundColor: 'black',
    margin: 'auto',
    border: 'none',
    borderRadius: 12,
    padding: 0,
  },
};

export const CroppedImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;
