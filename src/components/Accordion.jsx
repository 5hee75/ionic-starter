import React from "react";
import styled from "styled-components";
import {
  IonAccordion,
  IonButton,
  IonImg,
  IonItem,
  IonLabel,
  IonRow,
  IonThumbnail,
  IonIcon
} from "@ionic/react";
import { camera } from "ionicons/icons";

import Toggle from "./Toggle";
import { TextArea } from "./Input";
import { Select } from "./Select";

/* --background: rgba(${props => (props.status === 'fail' ? var(--ion-color-danger-rgb) : var(--ion-color-success-rgb))}, 0.05); */
const getColor = ({ status } = {}) => {
  if (!status) return "";
  return status === "fail"
    ? "var(--ion-color-danger-rgb)"
    : "var(--ion-color-success-rgb)";
};

const Item = styled(IonItem)`
  --background: rgba(${getColor}, 0.05);
`;

const StyledAccordion = styled(IonAccordion)`
  & > ion-item[slot="header"],
  &:last-of-type > ion-item[slot="header"] {
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
    background-image: linear-gradient(
      to bottom,
      rgba(${getColor}, 0.05),
      rgba(${getColor}, 0),
      rgba(${getColor}, 0)
    );
    & > ion-item {
      --background: transparent;
    }

    & > ion-item + ion-item {
      margin-top: 6px;
    }
  }
`;

const Thumb = styled(IonThumbnail)`
  margin-right: 4px;
  --border-radius: 4px;

  & > ion-button {
    height: 100%;
    margin: auto;
  }
`;

const Button = styled(IonButton).attrs({
  expand: "block",
  fill: "solid"
})`
  width: 75%;
  margin: auto;
  margin-top: 24px;
`;

export default function Accordion({ name, label, status, onChange }) {
  const [value, setValue] = React.useState(status);
  const [selected, setSelected] = React.useState([]);
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
        {/* <div style={{ width: "50%", margin: "auto" }}>
          <IonButton style={{ height: 48 }} fill="solid" expand="block" size="large">
            <IonIcon slot="icon-only" src={camera} />
          </IonButton>
        </div> */}
        {selected?.length > 0 ? (
          <IonItem>
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb>
              <IonImg src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpictures.topspeed.com%2FIMG%2Fcrop%2F200908%2Ftoyota-will-develop-_800x0w.jpg&f=1&nofb=1" />
            </Thumb>
            <Thumb slot="end">
              <IonButton expand="block">
                <IonIcon slot="icon-only" src={camera} />
              </IonButton>
            </Thumb>
          </IonItem>
        ) : (
          <Button>
            <IonIcon slot="icon-only" src={camera} />
          </Button>
        )}
      </div>
    </StyledAccordion>
  );
}
