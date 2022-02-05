import React, { useState } from "react";
import styled from "styled-components";

import {
  IonInput,
  IonLabel,
  IonItem,
  IonIcon,
  IonTextarea,
  IonText,
  IonNote
} from "@ionic/react";

export const InputItem = styled(IonItem).attrs((props) => ({
  lines: props.lines || "inset"
}))`
    
  &.item-has-focus {
    --background: #f8f8f8;
  }

  & .adornment,
  & .count {
    visibility: hidden;
    margin-right: 4px;
  }

  &.item-has-value .adornment,
  &.item-has-focus .adornment {
    visibility: visible;
  }

  &.item-has-focus .count {
    visibility: visible;
  }
`;

const InputLabel = styled(IonLabel).attrs({
  position: "floating",
  color: "medium"
})``;

const InputCount = styled(IonText).attrs((props) => ({
  color: props.color || "medium",
  className: "count ion-align-self-end"
}))``;

export const Input = ({ label, adornment = "" }) => {
  return (
    <>
      <InputItem>
        <InputLabel>{label}</InputLabel>
        <IonInput>
          {adornment && <IonIcon className="adornment" icon={adornment} />}
        </IonInput>
        <IonNote slot="error">Something bad here</IonNote>
      </InputItem>
    </>
  );
};

export const TextArea = ({ label, maxLength, ...itemProps }) => {
  const [count, setCount] = useState(0);

  const onChange = (e) => {
    setCount(e.detail.value.length);
  };
  return (
    <InputItem counter {...itemProps}>
      <InputLabel>{label}</InputLabel>
      <IonTextarea onIonChange={onChange} maxlength={maxLength} />
      {/* {count > 0 && (
        <InputCount color={maxLength - count < 10 ? "danger" : "medium"}>
          {count}/{maxLength}
        </InputCount>
      )} */}
    </InputItem>
  );
};
