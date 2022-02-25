import React from "react";
import styled from "styled-components";
import { IonAccordion, IonItem, IonLabel } from "@ionic/react";

import Toggle from "./Toggle";
import { TextArea } from "./Input";
import { Select } from "./Select";

/* --background: rgba(${props => (props.status === 'fail' ? var(--ion-color-danger-rgb) : var(--ion-color-success-rgb))}, 0.05); */

const Item = styled(IonItem)`
  --background: rgba(
    ${(props) =>
      props.status &&
      (props.status === "fail"
        ? "var(--ion-color-danger-rgb)"
        : "var(--ion-color-success-rgb)")},
    0.05
  );

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
  & > [slot="content"] {
    ${(props) =>
      props.status === "fail"
        ? `background-image: linear-gradient(
      to bottom,
      rgba(255, 0, 0, 0.05),
      rgba(255, 0, 0, 0.01),
      rgba(255, 0, 0, 0)
    );
    & > ion-item {
      --background: transparent;
    }`
        : null}
  }
  /* --border-width: 1px 0 0 0; */
`;

export default function Accordion({ name, label, status, onChange }) {
  const [value, setValue] = React.useState(status);
  const [selected, setSelected] = React.useState(null);
  const onToggle = (e) => {
    console.log(e.detail.value);
    setValue(e.detail.value);
    onChange({ name, status: e.detail.value });
  };

  return (
    <StyledAccordion
      status={value}
      readonly={false}
      value={name}
      toggleIconSlot="none"
    >
      <Item status={value} lines="full" slot="header">
        {label}
        <Toggle value={value} slot="end" onIonChange={onToggle} />
      </Item>
      <div slot="content" style={{ padding: "8px 12px 16px 0" }}>
        {/* <TextArea slot="content" label="Comments" maxLength={50} /> */}
        <Select
          multiple
          label="Description"
          value={selected}
          options={[
            { label: "Bent", value: 1 },
            { label: "Scratched", value: 2 },
            { label: "Cracked", value: 3 },
            { label: "Chipped", value: 4 }
          ]}
          onSelect={(newSelected) => {
            setSelected(newSelected);
          }}
        />
      </div>
    </StyledAccordion>
  );
}
