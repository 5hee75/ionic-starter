import React, { useState } from "react";
import styled from "styled-components";

import {
  IonInput,
  IonLabel,
  IonItem,
  IonIcon,
  IonTextarea,
  IonText,
  IonNote,
  IonRow,
  IonCol
} from "@ionic/react";

export const InputItem = styled(IonItem).attrs((props) => ({
  lines: props.lines || "inset"
}))`
  ${(props) =>
    !props.error
      ? null
      : `
      
    --border-color: var(--ion-color-danger) !important;
    & > ion-label.label {
      color: var(--ion-color-danger) !important;
    }
  `}

  &.item-has-focus {
    --background: #f8f8f8;
  }

  & .adornment {
    visibility: hidden;
    margin-right: 2px;
  }

  &.item-has-value .adornment,
  &.item-has-focus .adornment {
    visibility: visible;
  }

  & > [slot="error"] {
    color: var(--ion-color-danger) !important;
  }
`;

const InputLabel = styled(IonLabel).attrs({
  position: "floating",
  color: "medium",
  className: "label"
})``;

const InputBase = ({ children, ...props }) => (
  <InputItem {...props}>
    <InputLabel>{props.label}</InputLabel>
    {children}
    {props.error && <IonNote slot="error">{props.error}</IonNote>}
  </InputItem>
);

export const Input = ({ adornment = "", ...props }) => {
  return (
    <InputBase className="form-row" {...props}>
      <IonInput {...props}>
        {adornment && (
          <IonIcon slot="start" className="adornment" icon={adornment} />
        )}
      </IonInput>
    </InputBase>
  );
};

export const TextArea = ({ maxLength, ...props }) => {
  return (
    <InputBase className="form-row" counter {...props}>
      <IonTextarea maxlength={maxLength} />
    </InputBase>
  );
};

export const SplitRow = ({ children = null }) => {
  const childArr = React.Children.toArray(children);

  return (
    <IonRow className="form-row">
      {childArr.map((child) => (
        <IonCol className="ion-no-padding">{child}</IonCol>
      ))}
    </IonRow>
  );
};
