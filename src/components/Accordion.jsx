import React from "react";
import styled from "styled-components";
import { IonAccordion, IonItem, IonLabel } from "@ionic/react";

import Toggle from "./Toggle";
import { TextArea } from "./Input";

const Item = styled(IonItem)`
  /* --border: 1; */
  /* --border-width: 1px 0 0 0; */
  /* &:first-of-type {
    --border: 0;
  } */
`;

const StyledAccordion = styled(IonAccordion)`
  /* &.accordion-next > ion-item {
    --border-width: 1px 0 1px 0;
  } */
  & > ion-item[slot="header"],
  &:last-of-type > ion-item[slot="header"] {
    /* --background-activated: white; */
    --background-hover: white;
    --ripple-color: white;
    --background-focused: white;
    --border: 1;
    --border-width: 1px 0 0 0;
  }

  &:first-of-type > ion-item[slot="header"] {
    --border-width: 0;
  }
  /* --border-width: 1px 0 0 0; */
`;

export default function Accordion({ name, label, status, onChange }) {
  const [value, setValue] = React.useState(status);
  const onToggle = (e) => {
    setValue(e.detail.value);
    onChange({ name, status: e.detail.value });
  };

  return (
    <StyledAccordion readonly={false} value={name} toggleIconSlot="none">
      <Item lines="full" slot="header">
        {label}
        <Toggle value={value} slot="end" onIonChange={onToggle} />
      </Item>
      {/* <div slot="content"> */}
      <TextArea slot="content" label="Comments" maxLength={50} />
      {/* </div> */}
    </StyledAccordion>
  );
}
